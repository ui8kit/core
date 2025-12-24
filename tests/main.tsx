import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/test-styles.css';

import { Button } from '@ui8kit/core';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@ui8kit/core';

function TestApp() {
  return (
    <div className="test-container">
      <h1 className="text-2xl font-semibold mb-6">@ui8kit/core — Dev Playground</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>Variants and sizes (smoke test)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 items-center">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center mt-4">
              <Button size="xs">XS</Button>
              <Button size="sm">SM</Button>
              <Button size="default">Default</Button>
              <Button size="lg">LG</Button>
              <Button size="xl">XL</Button>
              <Button size="icon" aria-label="Icon button">
                ⌁
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <span className="text-sm text-muted-foreground">
              Tip: keep UI8Kit core minimal; brand styling lives in theme/tokens.
            </span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>Default composition with subcomponents</CardDescription>
          </CardHeader>
          <CardContent>
            <Card variant="outlined">
              <CardHeader>
                <CardTitle order={4}>Nested card</CardTitle>
                <CardDescription>Header / content / footer structure</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the content area. Use semantic structure first, decoration later.
                </p>
              </CardContent>
              <CardFooter className="justify-end">
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Render
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
);
