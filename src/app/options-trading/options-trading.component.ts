import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { AnyObject } from 'chart.js/dist/types/basic';
import { DataService, OptionContract, OrderInfo } from '../data.service';

@Component({
  selector: 'app-options-trading',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './options-trading.component.html',
  styleUrls: ['./options-trading.component.scss']
})
export class OptionsTradingComponent implements OnInit {
  // Label bindings
  niftyRadioLabel: string = 'Nifty';
  sensexRadioLabel: string = 'Sensex';
  selectedOptionValueLabel: string = '';

  // Input elements / Trackers
  selectedAsset: 'NIFTY' | 'SENSEX' = 'NIFTY';
  optionChain: OptionContract[] = [];
  selectedOption: OptionContract | null = null;
  
  quantityText: string = '65';
  summaryText: string = '';

  // Internal values
  selectedOptionLtpValue: number = 0;
  private ltpValue: number = 0;

  constructor(private optionsService: DataService) {}

  ngOnInit(): void {
    this.onLoad();
  }

  // Corresponds to OptionsTrading_Load
  onLoad(): void {
    const niftyExpiry = this.optionsService.getExpiryDate('NIFTY');
    const sensexExpiry = this.optionsService.getExpiryDate('SENSEX');

    const niftyTargetExpiryStr = this.optionsService.formatExpiryDate(niftyExpiry);
    const sensexTargetExpiryStr = this.optionsService.formatExpiryDate(sensexExpiry);

    this.niftyRadioLabel = `Nifty (${niftyTargetExpiryStr})`;
    this.sensexRadioLabel = `Sensex (${sensexTargetExpiryStr})`;

    // Initialize with default Nifty data loading
    this.onAssetChange('NIFTY');
  }

  // Combines RadioButton checked events & GetTokenOptions
  onAssetChange(asset: 'NIFTY' | 'SENSEX'): void {
    this.selectedAsset = asset;
    const targetExpiry = this.optionsService.formatExpiryDate(this.optionsService.getExpiryDate(asset));
    const exchSeg = asset === 'NIFTY' ? 'NFO' : 'BFO';

    this.getTokenOptions(asset, targetExpiry, exchSeg);
  }

  // Corresponds to GetTokenOptions
  private async getTokenOptions(targetAsset: string, targetExpiry: string, exchSeg: string): Promise<void> {
    let instruments: any[] = []; 
    this.optionsService.getStocksLists('').subscribe(result => {
      instruments = result;
     console.log('Fetched instruments:', instruments);

    // 2. Filter for Target Options Chain
    this.optionChain = instruments
      .filter((i: any) => 
        i.name === targetAsset &&
        i.exch_seg === exchSeg &&
        i.expiry === targetExpiry &&
        (i.instrumenttype === 'OPTIDX' || i.instrumenttype === 'OPTSTK')
      )
      .map((i: any) => {
        const strike = Number(i.strike) / 100.0;
        const optionType = i.symbol.endsWith('CE') ? 'CE' : 'PE';
        return {
          token: i.token,
          symbol: i.symbol,
          strike: strike,
          optionType: optionType,
          exchange: i.exch_seg,
          displayText: `${i.symbol} - ${strike} - ${optionType}`
        } as OptionContract;
      })
      .sort((a: OptionContract, b: OptionContract) => a.strike - b.strike);

    if (this.optionChain.length === 0) {
      alert('No options contracts found for the specified asset and expiry.');
    }

    // 3. Fetch Live Spot Price
    const targetAssetDetails = instruments.find(ins => ins.name === targetAsset);
    if (targetAssetDetails) {
      this.optionsService.getLTPData(targetAssetDetails.exch_seg, targetAssetDetails.token, targetAsset)
        .subscribe(
          (response: any) => {
            const spotPrice = response?.ltp || response?.data?.ltp || 0;
            this.calculateMoneyness(spotPrice);
          },
          (error: any) => {
            console.error('Error fetching spot price:', error);
            alert('Failed to fetch live spot price for the selected asset.');
          }
        );
    }
    }); // Simulating StocksHelper.StocksList

  }

  // Simulates moneyness loops inside GetTokenOptions
  private calculateMoneyness(spotPrice: number): void {
    const strikeInterval = 50.0;
    const atmStrike = Math.round(spotPrice / strikeInterval) * strikeInterval;

    for (const contract of this.optionChain) {
      let moneyness = 'Unknown';
      if (contract.strike === atmStrike) {
        moneyness = 'ATM';
      } else if (contract.optionType === 'CE') {
        moneyness = contract.strike < spotPrice ? 'ITM' : 'OTM';
      } else if (contract.optionType === 'PE') {
        moneyness = contract.strike > spotPrice ? 'ITM' : 'OTM';
      }
      // Process moneyness status changes as needed here...
    }
  }

  // Corresponds to optionsLB_SelectedIndexChanged
  onOptionSelected(event: any): void {
    if (!this.selectedOption) return;

    this.quantityText = '65';

    // Executes dynamic API data fetch block on choice changes
    this.optionsService
      .getLTPData(this.selectedOption.exchange, this.selectedOption.token, this.selectedOption.symbol)
      .subscribe(
        (res: any) => {
          console.log('LTP value:', res?.ltp || res?.data?.ltp || 0);
          this.selectedOptionLtpValue = Number(res?.ltp || res?.data?.ltp || 0);
          this.summaryText = `Selected Option: ${this.selectedOption?.displayText}, LTP: ${this.selectedOptionLtpValue}`;
        },
        (err: any) => {
          console.error('Error fetching LTP data:', err);
          this.summaryText = 'Error fetching LTP';
        }
      );
  }

  // Corresponds to buyBTN_Click
  onBuyClick(): void {
    if (!this.selectedOption) {
      alert('Please select an option contract.');
      return;
    }

    const sampleOrder: OrderInfo = {
      variety: 'NORMAL',
      tradingsymbol: this.selectedOption.symbol,
      symboltoken: this.selectedOption.token,
      transactiontype: 'BUY',
      exchange: this.selectedOption.exchange,
      ordertype: 'LIMIT',
      producttype: 'DELIVERY',
      duration: 'DAY',
      price: this.selectedOptionLtpValue.toString(),
      squareoff: '0',
      stoploss: '0',
      quantity: this.quantityText,
      triggerprice: '0',
      trailingStopLoss: '0',
      disclosedquantity: '0',
      ordertag: 'AlgoOrder01'
    };

    this.optionsService.placeOrder(sampleOrder).subscribe(
      (res: any) => {
        alert('Order response received successfully!');
        console.log(res);
        console.log('res data:', res?.data ?? res);
        this.summaryText = `Order placed: ${res?.orderid || res?.data?.orderid || 'Unknown ID'}`;
      },
      (err: any) => {
        console.log(err);
        alert(`Failed to execute order: ${err}|| 'Unknown error'}`);
      }
    );
  }
}