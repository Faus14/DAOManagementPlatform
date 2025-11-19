import { useState } from 'react';
import { mockUsers } from '../lib/mock-data';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { UserPlus, Mail, Shield } from 'lucide-react';
import { User } from '../types';

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Contributor':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Viewer':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const handleRoleChange = (userId: string, newRole: User['role']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl mb-2">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">
              Administra los miembros y roles de tu DAO
            </p>
          </div>

          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Invitar Usuario
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Total Usuarios</span>
              <Shield className="h-5 w-5 text-indigo-400" />
            </div>
            <p className="text-3xl">{users.length}</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Admins</span>
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
            <p className="text-3xl">{users.filter(u => u.role === 'Admin').length}</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Contributors</span>
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-3xl">{users.filter(u => u.role === 'Contributor').length}</p>
          </div>
        </div>

        {/* Users table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-background/20">
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-background/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <code className="text-xs text-muted-foreground">
                      {user.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : 'N/A'}
                    </code>
                  </TableCell>

                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user.id, value as User['role'])}
                    >
                      <SelectTrigger className="w-[140px] glass-card border-border">
                        <SelectValue>
                          <Badge variant="outline" className={getRoleBadge(user.role)}>
                            {user.role}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Contributor">Contributor</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Roles info */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="mb-4">Información de Roles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Badge variant="outline" className="mb-3 bg-purple-500/20 text-purple-400 border-purple-500/50">
                Admin
              </Badge>
              <p className="text-sm text-muted-foreground">
                Acceso completo: puede crear proposals, gestionar tareas, usuarios y configuración.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Badge variant="outline" className="mb-3 bg-blue-500/20 text-blue-400 border-blue-500/50">
                Contributor
              </Badge>
              <p className="text-sm text-muted-foreground">
                Puede crear y editar tareas, subir documentos y participar activamente.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-500/10 border border-gray-500/20">
              <Badge variant="outline" className="mb-3 bg-gray-500/20 text-gray-400 border-gray-500/50">
                Viewer
              </Badge>
              <p className="text-sm text-muted-foreground">
                Solo lectura: puede ver proposals, tareas y documentos sin editar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
