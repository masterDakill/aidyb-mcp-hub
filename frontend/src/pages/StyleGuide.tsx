import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { colors, typography, borderRadius } from '../lib/theme/tokens'

/**
 * Style Guide Page - AIDYN Design System
 * 
 * Cette page présente tous les éléments du design system AIDYN
 * pour validation visuelle et tests.
 */

export const StyleGuide: React.FC = () => {
  const [isDark, setIsDark] = useState(false)
  
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold font-display text-aidyn-primary-500">
              AIDYN Design System
            </h1>
            <Button 
              variant="aidyn-outline-primary" 
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </Button>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Guide de style et tests visuels pour la conformité au design AIDYN.
            Cette page présente tous les composants, couleurs et tokens de design.
          </p>
        </header>

        <Tabs defaultValue="colors" className="space-y-8">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="colors">Couleurs</TabsTrigger>
            <TabsTrigger value="typography">Typo</TabsTrigger>
            <TabsTrigger value="buttons">Boutons</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
          </TabsList>

          {/* Colors Section */}
          <TabsContent value="colors" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Palette de Couleurs AIDYN</h2>
              
              <div className="space-y-8">
                {/* Primary Colors */}
                <div>
                  <h3 className="text-lg font-medium mb-4 text-aidyn-primary-500">Couleur Primaire (Vert)</h3>
                  <div className="grid grid-cols-11 gap-2">
                    {Object.entries(colors.primary).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div 
                          className="w-full h-16 rounded-lg border shadow-sm mb-2"
                          style={{ backgroundColor: value }}
                        />
                        <div className="text-xs">
                          <div className="font-mono">{key}</div>
                          <div className="text-muted-foreground">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Colors */}
                <div>
                  <h3 className="text-lg font-medium mb-4 text-aidyn-secondary-500">Couleur Secondaire (Cyan)</h3>
                  <div className="grid grid-cols-11 gap-2">
                    {Object.entries(colors.secondary).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div 
                          className="w-full h-16 rounded-lg border shadow-sm mb-2"
                          style={{ backgroundColor: value }}
                        />
                        <div className="text-xs">
                          <div className="font-mono">{key}</div>
                          <div className="text-muted-foreground">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dark Colors */}
                <div>
                  <h3 className="text-lg font-medium mb-4 text-aidyn-dark-500">Couleurs Sombres</h3>
                  <div className="grid grid-cols-11 gap-2">
                    {Object.entries(colors.dark).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div 
                          className="w-full h-16 rounded-lg border shadow-sm mb-2"
                          style={{ backgroundColor: value }}
                        />
                        <div className="text-xs">
                          <div className="font-mono">{key}</div>
                          <div className="text-muted-foreground">{value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Colors */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Couleurs d'État</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-full h-16 bg-aidyn-success rounded-lg border shadow-sm mb-2" />
                      <div className="text-sm font-medium">Success</div>
                      <div className="text-xs text-muted-foreground">{colors.success[500]}</div>
                    </div>
                    <div className="text-center">
                      <div className="w-full h-16 bg-aidyn-warning rounded-lg border shadow-sm mb-2" />
                      <div className="text-sm font-medium">Warning</div>
                      <div className="text-xs text-muted-foreground">{colors.warning[500]}</div>
                    </div>
                    <div className="text-center">
                      <div className="w-full h-16 bg-aidyn-danger rounded-lg border shadow-sm mb-2" />
                      <div className="text-sm font-medium">Danger</div>
                      <div className="text-xs text-muted-foreground">{colors.danger[500]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Typography Section */}
          <TabsContent value="typography" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Typographie AIDYN</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Familles de Police</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="font-sans text-xl mb-2">Aidyn Sans (Primary)</div>
                      <div className="text-muted-foreground text-sm font-mono">font-family: {typography.fontFamily.primary.join(', ')}</div>
                      <div className="mt-2 font-sans">The quick brown fox jumps over the lazy dog</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="font-display text-xl mb-2">Aidvitneum (Display)</div>
                      <div className="text-muted-foreground text-sm font-mono">font-family: {typography.fontFamily.secondary.join(', ')}</div>
                      <div className="mt-2 font-display">The quick brown fox jumps over the lazy dog</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="font-mono text-xl mb-2">Monospace (Code)</div>
                      <div className="text-muted-foreground text-sm font-mono">font-family: {typography.fontFamily.mono.join(', ')}</div>
                      <div className="mt-2 font-mono">const hello = "world";</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Échelle Typographique</h3>
                  <div className="space-y-4">
                    {Object.entries(typography.fontSize).map(([key, value]) => (
                      <div key={key} className="flex items-baseline gap-4 p-2 border-b">
                        <div className="w-16 text-sm font-mono text-muted-foreground">{key}</div>
                        <div className="w-20 text-sm font-mono text-muted-foreground">{value}</div>
                        <div style={{ fontSize: value }} className="font-sans">
                          Texte d'exemple
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Buttons Section */}
          <TabsContent value="buttons" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Boutons AIDYN</h2>
              
              <div className="space-y-8">
                {/* Primary Buttons */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Variantes Principales</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="aidyn-primary">Primary</Button>
                    <Button variant="aidyn-secondary">Secondary</Button>
                    <Button variant="aidyn-success">Success</Button>
                    <Button variant="aidyn-warning">Warning</Button>
                    <Button variant="aidyn-danger">Danger</Button>
                  </div>
                </div>

                {/* Outline Buttons */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Variantes Outline</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="aidyn-outline-primary">Outline Primary</Button>
                    <Button variant="aidyn-outline-secondary">Outline Secondary</Button>
                  </div>
                </div>

                {/* Ghost Buttons */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Variantes Ghost</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="aidyn-ghost-primary">Ghost Primary</Button>
                    <Button variant="aidyn-ghost-secondary">Ghost Secondary</Button>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Tailles</h3>
                  <div className="flex items-end gap-4">
                    <Button variant="aidyn-primary" size="sm">Small</Button>
                    <Button variant="aidyn-primary" size="default">Default</Button>
                    <Button variant="aidyn-primary" size="lg">Large</Button>
                    <Button variant="aidyn-primary" size="icon">🎯</Button>
                  </div>
                </div>

                {/* States */}
                <div>
                  <h3 className="text-lg font-medium mb-4">États</h3>
                  <div className="flex gap-4">
                    <Button variant="aidyn-primary">Normal</Button>
                    <Button variant="aidyn-primary" disabled>Disabled</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Other sections would follow similar pattern... */}
          
          {/* Quick preview for other tabs */}
          <TabsContent value="inputs" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Inputs AIDYN</h2>
              <div className="space-y-4 max-w-md">
                <Input placeholder="Default input" />
                <Input variant="aidyn-primary" placeholder="Primary variant (Cyan)" />
                <Input variant="aidyn-secondary" placeholder="Secondary variant (Blue)" />
                <Input variant="aidyn-danger" placeholder="Error state" aria-invalid={true} />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Badges AIDYN</h2>
              <div className="flex flex-wrap gap-4">
                <Badge variant="aidyn-primary">Primary (Cyan)</Badge>
                <Badge variant="aidyn-secondary">Secondary (Blue)</Badge>
                <Badge variant="aidyn-success">Success (Green)</Badge>
                <Badge variant="aidyn-warning">Warning</Badge>
                <Badge variant="aidyn-danger">Danger (Red)</Badge>
                <Badge variant="aidyn-soft-primary">Soft Primary</Badge>
                <Badge variant="aidyn-outline-primary">Outline</Badge>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-2">Card par défaut</h3>
                <p className="text-muted-foreground">Contenu de la card standard avec le design AIDYN.</p>
              </Card>
              <Card className="p-6 border-aidyn-primary-200 bg-gradient-to-br from-aidyn-primary-50 to-white">
                <h3 className="text-xl font-semibold mb-2 text-aidyn-primary-700">Card Primary</h3>
                <p className="text-aidyn-primary-600">Card avec thème primaire AIDYN.</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Design Tokens Summary */}
        <Card className="mt-8 p-6">
          <h2 className="text-2xl font-semibold mb-4">Résumé des Design Tokens</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Couleurs Principales</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Primary: {colors.primary[500]}</li>
                <li>• Secondary: {colors.secondary[500]}</li>
                <li>• Dark: {colors.dark[950]}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Rayons</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Base: {borderRadius.base}</li>
                <li>• Large: {borderRadius.lg}</li>
                <li>• XL: {borderRadius.xl}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ombres</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Soft</li>
                <li>• Medium</li>
                <li>• Glow effects</li>
              </ul>
            </div>
          </div>
        </Card>

        <footer className="mt-8 text-center text-muted-foreground">
          <p>AIDYN Design System • Style Guide généré automatiquement</p>
        </footer>
      </div>
    </div>
  )
}