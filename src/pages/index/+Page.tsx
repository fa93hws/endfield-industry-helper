import AppLayout from '@ui/layout/app_layout';
import { images } from '@data/items/images';
import { allProduces } from '@data/items/aic';
import { naturalItems } from '@data/items/natural';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export default function Page() {
  return (
    <AppLayout current="items">
      <Typography variant="h4" gutterBottom>
        物品
      </Typography>

      {/* Natural Items Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        自然物品
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(naturalItems).map(([key, name]) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={key}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={images[key as keyof typeof images]}
                alt={name}
                sx={{ objectFit: 'contain', bgcolor: 'grey.100' }}
              />
              <CardContent>
                <Typography variant="body2" align="center" noWrap>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* AIC Products Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        AIC产品
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(allProduces).map(([key, name]) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={key}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={images[key as keyof typeof images]}
                alt={name}
                sx={{ objectFit: 'contain', bgcolor: 'grey.100' }}
              />
              <CardContent>
                <Typography variant="body2" align="center" noWrap>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </AppLayout>
  );
}
