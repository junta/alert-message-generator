import { Grid, Button, TextField, Checkbox, MenuItem } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Content() {
  const [outputJson, setOutputJson] = useState('');
  const [copied, setCopied] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isReverse: false,
    },
  });

  const onSubmit = (data) => {
    console.log('onSubmit:', data);
    const alertObject = {
      exchange: data.exchange,
      strategy: data.strategyName,
      market: data.market,
      size: data.orderSize,
      reverse: data.isReverse,
      order: '{{strategy.order.action}}',
      position: '{{strategy.market_position}}',
      price: '{{strategy.order.price}}',
    };
    if (data.passphrase) {
      alertObject.passphrase = data.passphrase;
    }
    const alertJson = JSON.stringify(alertObject, null, '\t');
    setOutputJson(alertJson);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <h2>Input(Parameters)</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              control={control}
              name="exchange"
              rules={{ required: 'required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="exchange"
                  margin="normal"
                  id="select"
                  select
                  style={{ width: '200px' }}
                  error={errors.exchange ? true : false}
                  helperText={errors.exchange?.message}
                >
                  <MenuItem value="dydx">dYdX</MenuItem>
                  <MenuItem value="perpetual">Perpetual Protocol</MenuItem>
                </TextField>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="strategyName"
              rules={{ required: 'required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Strategy Name"
                  margin="normal"
                  placeholder="MacdStrategy"
                  error={errors.strategyName ? true : false}
                  helperText={
                    errors.strategyName
                      ? errors.strategyName?.message
                      : 'any string to distinct each strategy'
                  }
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="market"
              rules={{ required: 'required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="market"
                  margin="normal"
                  id="select"
                  select
                  style={{ width: '200px' }}
                  error={errors.market ? true : false}
                  helperText={errors.market?.message}
                >
                  <MenuItem value="BTC_USD">BTC</MenuItem>
                  <MenuItem value="ETH_USD">ETH</MenuItem>
                  <MenuItem value="LINK_USD">LINK</MenuItem>
                  <MenuItem value="AAVE_USD">AAVE</MenuItem>
                  <MenuItem value="UNI_USD">UNI</MenuItem>
                  <MenuItem value="SUSHI_USD">SUSHI</MenuItem>
                  <MenuItem value="SOL_USD">SOL</MenuItem>
                  <MenuItem value="YFI_USD">YFI</MenuItem>
                  <MenuItem value="1INCH_USD">1INCH</MenuItem>
                  <MenuItem value="AVAX_USD">AVAX</MenuItem>
                  <MenuItem value="SNX_USD">SNX</MenuItem>
                  <MenuItem value="CRV_USD">CRV</MenuItem>
                  <MenuItem value="UMA_USD">UMA</MenuItem>
                  <MenuItem value="DOT_USD">DOT</MenuItem>
                  <MenuItem value="DOGE_USD">DOGE</MenuItem>
                  <MenuItem value="MATIC_USD">MATIC</MenuItem>
                  <MenuItem value="MKR_USD">MKR</MenuItem>
                  <MenuItem value="FIL_USD">FIL</MenuItem>
                  <MenuItem value="ADA_USD">ADA</MenuItem>
                  <MenuItem value="ATOM_USD">ATOM</MenuItem>
                  <MenuItem value="COMP_USD">COMP</MenuItem>
                  <MenuItem value="BCH_USD">BCH</MenuItem>
                  <MenuItem value="LTC_USD">LTC</MenuItem>
                  <MenuItem value="EOS_USD">EOS</MenuItem>
                  <MenuItem value="ALGO_USD">ALGO</MenuItem>
                  <MenuItem value="ZRX_USD">ZRX</MenuItem>
                  <MenuItem value="XMR_USD">XMR</MenuItem>
                  <MenuItem value="ZEC_USD">ZEC</MenuItem>
                  <MenuItem value="ENJ_USD">ENJ</MenuItem>
                  <MenuItem value="ETC_USD">ETC</MenuItem>
                  <MenuItem value="XLM_USD">XLM</MenuItem>
                  <MenuItem value="TRX_USD">TRX</MenuItem>
                  <MenuItem value="XTZ_USD">XTZ</MenuItem>
                  <MenuItem value="HNT_USD">HNT</MenuItem>
                  <MenuItem value="APE_USD">APE</MenuItem>
                  <MenuItem value="BNB_USD">BNB</MenuItem>
                  <MenuItem value="FLOW_USD">FLOW</MenuItem>
                  <MenuItem value="FTM_USD">FTM</MenuItem>
                  <MenuItem value="NEAR_USD">NEAR</MenuItem>
                  <MenuItem value="ONE_USD">ONE</MenuItem>
                  <MenuItem value="PERP_USD">PERP</MenuItem>
                  <MenuItem value="SAND_USD">SAND</MenuItem>
                </TextField>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="orderSize"
              rules={{ required: 'required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="order size"
                  margin="normal"
                  placeholder="0.1"
                  type="number"
                  error={errors.orderSize ? true : false}
                  helperText={
                    errors.strategyName
                      ? errors.strategyName?.message
                      : 'must be greater than mininum order size on dYdX'
                  }
                  inputProps={{
                    maxLength: 13,
                    step: '0.001',
                  }}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="isReverse"
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  control={<Checkbox checked={value} onChange={onChange} color="primary" />}
                  label="is reverse order strategy"
                />
              )}
            />
            <p style={{ fontSize: '14px', color: 'gray' }}>
              check ON if this strategy takes opposite position on each trade and always has long or
              short position.
            </p>
          </div>

          <div>
            <Controller
              control={control}
              name="passphrase"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Passphrase(optional)"
                  margin="normal"
                  placeholder="your passphrase"
                  helperText="to enhance security"
                />
              )}
            />
          </div>

          <Button variant="contained" color="primary" type="submit">
            Generate
          </Button>
        </form>
      </Grid>
      <Grid item xs={6}>
        <h2>Output(Generated alert message)</h2>
        <div>
          <TextField
            variant="outlined"
            multiline
            rows={10}
            value={outputJson}
            style={{ width: '80%' }}
            onChange={(event) => setOutputJson(event.target.value)}
          />
        </div>
        <CopyToClipboard text={outputJson} onCopy={() => setCopied(true)}>
          <button>Copy to clipboard</button>
        </CopyToClipboard>
        {copied ? <span style={{ color: 'green' }}>Copied.</span> : null}
      </Grid>
    </Grid>
  );
}

export default Content;
