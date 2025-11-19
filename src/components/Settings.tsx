import { useState } from 'react';
import { mockDAOs, currentUser } from '../lib/mock-data';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Settings as SettingsIcon, Link2, Eye, Shield, Save } from 'lucide-react';

export function Settings() {
  const [daoName, setDaoName] = useState(mockDAOs[0].name);
  const [snapshotSpace, setSnapshotSpace] = useState('metadao.eth');
  const [publicProposals, setPublicProposals] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl mb-2">Configuración</h1>
          <p className="text-muted-foreground">
            Gestiona la configuración de tu DAO y las integraciones
          </p>
        </div>

        {/* Settings tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="glass-card border-border">
            <TabsTrigger value="general">
              <SettingsIcon className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <Link2 className="mr-2 h-4 w-4" />
              Integraciones
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Eye className="mr-2 h-4 w-4" />
              Privacidad
            </TabsTrigger>
            <TabsTrigger value="permissions">
              <Shield className="mr-2 h-4 w-4" />
              Permisos
            </TabsTrigger>
          </TabsList>

          {/* General settings */}
          <TabsContent value="general">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div>
                <h2 className="mb-4">Información de la DAO</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="dao-name">Nombre de la DAO</Label>
                    <Input
                      id="dao-name"
                      value={daoName}
                      onChange={(e) => setDaoName(e.target.value)}
                      className="mt-2 glass-card border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dao-description">Descripción</Label>
                    <textarea
                      id="dao-description"
                      rows={4}
                      className="mt-2 w-full p-3 rounded-lg glass-card border border-border bg-transparent text-foreground resize-none"
                      placeholder="Describe tu DAO..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="dao-website">Sitio Web</Label>
                    <Input
                      id="dao-website"
                      type="url"
                      placeholder="https://..."
                      className="mt-2 glass-card border-border"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="mb-2">Snapshot</h3>
                    <p className="text-sm text-muted-foreground">
                      Conecta con Snapshot para importar proposals aprobadas automáticamente
                    </p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    Conectado
                  </Badge>
                </div>

                <div className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="snapshot-space">Snapshot Space</Label>
                    <Input
                      id="snapshot-space"
                      value={snapshotSpace}
                      onChange={(e) => setSnapshotSpace(e.target.value)}
                      className="mt-2 glass-card border-border"
                      placeholder="tu-dao.eth"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/30">
                    <div>
                      <p className="mb-1">Sincronización automática</p>
                      <p className="text-sm text-muted-foreground">
                        Importar proposals automáticamente cuando sean aprobadas
                      </p>
                    </div>
                    <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="outline" className="border-indigo-500/50">
                    Actualizar Integración
                  </Button>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="mb-2">Discord</h3>
                    <p className="text-sm text-muted-foreground">
                      Envía notificaciones a tu servidor de Discord
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-500/50">
                    No conectado
                  </Badge>
                </div>

                <Button variant="outline" className="mt-4 border-indigo-500/50">
                  Conectar Discord
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div>
                <h2 className="mb-4">Configuración de Visibilidad</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/30">
                    <div className="flex-1">
                      <p className="mb-1">Proposals públicas por defecto</p>
                      <p className="text-sm text-muted-foreground">
                        Las nuevas proposals serán visibles públicamente sin iniciar sesión
                      </p>
                    </div>
                    <Switch checked={publicProposals} onCheckedChange={setPublicProposals} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/30">
                    <div className="flex-1">
                      <p className="mb-1">Mostrar documentos públicamente</p>
                      <p className="text-sm text-muted-foreground">
                        Los documentos marcados como públicos serán accesibles sin autenticación
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/30">
                    <div className="flex-1">
                      <p className="mb-1">Mostrar presupuesto públicamente</p>
                      <p className="text-sm text-muted-foreground">
                        El presupuesto gastado y aprobado será visible en la vista pública
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Permissions */}
          <TabsContent value="permissions">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div>
                <h2 className="mb-4">Control de Permisos</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/30">
                    <div className="flex-1">
                      <p className="mb-1">Aprobar nuevas tareas</p>
                      <p className="text-sm text-muted-foreground">
                        Las tareas creadas por Contributors requieren aprobación de Admin
                      </p>
                    </div>
                    <Switch checked={requireApproval} onCheckedChange={setRequireApproval} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/30">
                    <div className="flex-1">
                      <p className="mb-1">Permitir invitaciones de Contributors</p>
                      <p className="text-sm text-muted-foreground">
                        Los Contributors pueden invitar nuevos miembros con rol Viewer
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/30">
                    <div className="flex-1">
                      <p className="mb-1">Edición de presupuesto</p>
                      <p className="text-sm text-muted-foreground">
                        Solo Admins pueden editar el presupuesto de tareas
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10">
                <p className="text-sm text-yellow-400">
                  ⚠️ Los cambios en permisos afectan a todos los usuarios inmediatamente
                </p>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { Badge } from './ui/badge';
