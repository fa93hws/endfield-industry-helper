import AppLayout from '@ui/layout/app_layout';
import { Link, Typography, Box, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Page() {
  return (
    <AppLayout current="items">
      <Typography variant="h4" gutterBottom>
        欢迎
      </Typography>

      <Stack spacing={3}>
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            这是一个终末地基础设施助手，帮助你查看和管理各种生产配方。
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            你可以浏览不同类型的配方，包括矿石、植物、药品、电池和装备组件等。
          </Typography>
        </Box>

        <Stack spacing={2}>
          <Link href="/receipts" variant="h6" underline="hover">
            查看配方 →
          </Link>
          <Link href="#" variant="h6" underline="hover" color="text.secondary">
            量化计算器 (WIP)
          </Link>
        </Stack>

        <Box sx={{ mt: 4 }}>
          <Link
            href="https://github.com/fa93hws/endfield-infra-helper"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <GitHubIcon />
            <Typography variant="body2">View on GitHub</Typography>
          </Link>
        </Box>
      </Stack>
    </AppLayout>
  );
}
