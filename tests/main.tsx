import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/test-styles.css';

import { Button } from '@ui8kit/core';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@ui8kit/core';
import { Grid } from '@ui8kit/core';
import { Block } from '@ui8kit/core';

function TestApp() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('ui8kit-tests-theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('ui8kit-tests-theme', theme);
    } catch {
      // Ignore storage errors (private mode, disabled storage, etc.)
    }
  }, [theme]);

  return (
    <div className="test-container">
      <button
        type="button"
        className="fixed left-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground shadow-sm"
        onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        aria-label="Toggle theme"
      >
        <span
          aria-hidden="true"
          className={`inline-block h-2.5 w-2.5 rounded-full ${theme === 'dark' ? 'bg-chart-2' : 'bg-chart-5'}`}
        />
        {theme === 'dark' ? 'Dark' : 'Light'}
      </button>

      <h1 className="text-2xl font-semibold mb-6">@ui8kit/core — Dev Playground</h1>

      <div className="grid gap-6">
        <Block
          variant="section"
          className="bg-primary text-primary-foreground rounded-lg p-4"
        >
          <Card variant="filled">
            <CardHeader>
              <CardTitle order={4}>Grid</CardTitle>
              <CardDescription>Responsive cols rule list</CardDescription>
            </CardHeader>
            <CardContent>
              <Grid
                cols={[
                  { bp: "base", value: 1 },
                  { bp: "md", value: 2 },
                  { bp: "lg", value: 3 }
                ]}
                gap="md"
              >
                <div className="h-10 rounded-md bg-primary-foreground/10" />
                <div className="h-10 rounded-md bg-primary-foreground/10" />
                <div className="h-10 rounded-md bg-primary-foreground/10" />
                <div className="h-10 rounded-md bg-primary-foreground/10" />
                <div className="h-10 rounded-md bg-primary-foreground/10" />
                <div className="h-10 rounded-md bg-primary-foreground/10" />
              </Grid>
            </CardContent>
          </Card>
        </Block>

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

        <Card grid gap="6">
          <CardHeader>
            <CardTitle>Utility props (CDL single-token)</CardTitle>
            <CardDescription>
              Use a few whitelisted utility props for small adjustments; 3+ props is a signal to add a variant.
            </CardDescription>
          </CardHeader> 
          <CardContent>
            <div className="grid gap-4">
              <Card bg="muted" p="4" rounded="md">
                p=&quot;4&quot; bg=&quot;muted&quot; rounded=&quot;md&quot;
              </Card>

              <Card bg="card" p="4" border rounded="md">
                border=&quot;&quot; p=&quot;4&quot; bg=&quot;card&quot;
              </Card>

              <Card grid="cols-12" gap="2">
                <Card bg="muted" rounded="md" p="2" col="start-1" row="start-1" auto="rows-auto">
                  grid helpers: col=&quot;start-1&quot; row=&quot;start-1&quot; auto=&quot;rows-auto&quot;
                </Card>
              </Card>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button size="sm">OK</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>Default composition with subcomponents</CardDescription>
          </CardHeader>
          <CardContent>
            <Card variant="filled">
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
