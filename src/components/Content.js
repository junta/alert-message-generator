import { Grid, Button, TextField } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

function Content() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      checkBox: false,
      textBox: '',
      pullDown: '',
    },
  });

  const onSubmit = (action) => {};

  return (
    <Grid container>
      <Grid sm={2} />
      <Grid lg={8} sm={8} spacing={10}>
        <form>
          <Controller
            control={control}
            name="textBox"
            render={({ field }) => (
              <TextField
                {...field}
                label="テキストフィールド"
                fullWidth
                margin="normal"
                placeholder="プレースホルダー"
              />
            )}
          />

          <Button variant="contained" color="primary" onClick={() => onSubmit('next')}>
            次へ
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default Content;
