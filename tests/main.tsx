import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/test-styles.css';

// Импортируем компоненты
import {
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Badge,
  Text, Title,
  Box,
  Stack,
  Group,
  Container
} from '@ui8kit/core';

function TestApp() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Title order={1}>@ui8kit/core Test Environment</Title>

        <Card>
          <CardHeader>
            <CardTitle>Component Showcase</CardTitle>
            <CardDescription>
              Testing environment for @ui8kit/core components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="md">
              <div>
                <Title order={3} style={{ marginBottom: '12px' }}>Buttons</Title>
                <Group>
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </Group>
              </div>

              <div>
                <Title order={3} style={{ marginBottom: '12px' }}>Badges</Title>
                <Group>
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </Group>
              </div>

              <div>
                <Title order={3} style={{ marginBottom: '12px' }}>Typography</Title>
                <Text>
                  This is a text component demonstrating the typography system.
                </Text>
              </div>

              <Box p="md" bg="muted">
                <Text size="sm" c="muted">
                  This box demonstrates background colors and spacing utilities.
                </Text>
              </Box>
            </Stack>
          </CardContent>
          <CardFooter>
            <Text size="sm" c="muted">
              Test environment ready for development and testing.
            </Text>
          </CardFooter>
        </Card>
      </Stack>
    </Container>
  );
}

// Рендерим приложение
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
);

// Логируем успешные импорты
console.log('✅ @ui8kit/core components loaded successfully');
