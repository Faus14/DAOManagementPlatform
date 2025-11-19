import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProposals, mockDAOs } from '../lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { DollarSign, TrendingUp, Plus } from 'lucide-react';

export function Dashboard() {
  const [selectedDAO, setSelectedDAO] = useState('1');
  const navigate = useNavigate();

  const filteredProposals = mockProposals.filter(p => p.daoId === selectedDAO);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Blocked':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Gestiona y da seguimiento a tus proposals activas
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={selectedDAO} onValueChange={setSelectedDAO}>
              <SelectTrigger className="w-[200px] glass-card border-border">
                <SelectValue placeholder="Selecciona DAO" />
              </SelectTrigger>
              <SelectContent>
                {mockDAOs.map((dao) => (
                  <SelectItem key={dao.id} value={dao.id}>
                    <span className="flex items-center gap-2">
                      <span>{dao.logo}</span>
                      <span>{dao.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Proposal
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Proposals Activas</span>
              <TrendingUp className="h-5 w-5 text-indigo-400" />
            </div>
            <p className="text-3xl">{filteredProposals.filter(p => p.status === 'In progress').length}</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Presupuesto Total</span>
              <DollarSign className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-3xl">
              ${filteredProposals.reduce((acc, p) => acc + p.budgetApproved, 0).toLocaleString()}
            </p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Completadas</span>
              <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-xs">✓</span>
              </div>
            </div>
            <p className="text-3xl">{filteredProposals.filter(p => p.status === 'Completed').length}</p>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          <h2 className="text-xl">Proposals Activas</h2>

          {filteredProposals.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <p className="text-muted-foreground">
                No hay proposals para esta DAO
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredProposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="glass-card-hover rounded-xl p-6 cursor-pointer"
                  onClick={() => navigate(`/proposal/${proposal.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="mb-2">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {proposal.daoName}
                      </p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(proposal.status)}>
                      {proposal.status}
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="text-indigo-400">{proposal.progress}%</span>
                    </div>
                    <Progress value={proposal.progress} className="h-2" />
                  </div>

                  {/* Budget */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Presupuesto</p>
                      <p className="text-sm">
                        ${proposal.budgetSpent.toLocaleString()} / ${proposal.budgetApproved.toLocaleString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="border-indigo-500/50">
                      Ver Proposal
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
