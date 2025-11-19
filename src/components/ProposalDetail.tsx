import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProposals } from '../lib/mock-data';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, ExternalLink, DollarSign, User, Calendar } from 'lucide-react';
import { TaskBoard } from './TaskBoard';
import { DocumentsList } from './DocumentsList';
import { ActivityFeed } from './ActivityFeed';

export function ProposalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tasks');

  const proposal = mockProposals.find((p) => p.id === id);

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">Proposal no encontrada</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Dashboard
        </Button>

        {/* Header */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{mockProposals.find(p => p.daoId === proposal.daoId)?.daoName}</span>
                <Badge variant="outline" className={getStatusColor(proposal.status)}>
                  {proposal.status}
                </Badge>
              </div>
              <h1 className="text-2xl mb-3">{proposal.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Owner: {proposal.owner.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(proposal.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="border-indigo-500/50"
                onClick={() => window.open(proposal.snapshotUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver en Snapshot
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/50"
                onClick={() => navigate(`/public/${proposal.id}`)}
              >
                Vista Pública
              </Button>
            </div>
          </div>

          {/* Progress and budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-border">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progreso General</span>
                <span className="text-indigo-400">{proposal.progress}%</span>
              </div>
              <Progress value={proposal.progress} className="h-3" />
            </div>

            <div className="flex items-center justify-between glass-card rounded-lg p-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Presupuesto</p>
                <p className="text-xl">
                  ${proposal.budgetSpent.toLocaleString()} / ${proposal.budgetApproved.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="mb-4">Descripción</h2>
          <div className="text-muted-foreground whitespace-pre-line">
            {proposal.description}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="glass-card border-border">
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="activity">Actividad</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="mt-6">
            <TaskBoard proposalId={proposal.id} />
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <DocumentsList documents={proposal.documents} />
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <ActivityFeed activities={proposal.activity} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
