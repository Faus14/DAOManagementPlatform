import { useParams, useNavigate } from 'react-router-dom';
import { mockProposals } from '../lib/mock-data';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ExternalLink, DollarSign, Lock, Eye } from 'lucide-react';

export function PublicProposalView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const proposal = mockProposals.find((p) => p.id === id);

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">Proposal no encontrada</p>
        </div>
      </div>
    );
  }

  if (!proposal.isPublic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-xl p-12 text-center max-w-md">
          <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="mb-2">Proposal Privada</h2>
          <p className="text-muted-foreground mb-6">
            Esta proposal no está disponible públicamente
          </p>
          <Button onClick={() => navigate('/login')}>
            Iniciar Sesión
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

  const publicDocuments = proposal.documents.filter((d) => d.isPublic);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Public badge */}
        <div className="flex items-center justify-center gap-2 text-green-400">
          <Eye className="h-4 w-4" />
          <span className="text-sm">Vista Pública</span>
        </div>

        {/* Header */}
        <div className="glass-card rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h1 className="text-3xl mb-2">{proposal.title}</h1>
          <p className="text-muted-foreground mb-4">{proposal.daoName}</p>
          <div className="flex items-center justify-center gap-3">
            <Badge variant="outline" className={getStatusColor(proposal.status)}>
              {proposal.status}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(proposal.snapshotUrl, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver en Snapshot
            </Button>
          </div>
        </div>

        {/* Progress and budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="mb-4">Progreso General</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Completado</span>
              <span className="text-indigo-400">{proposal.progress}%</span>
            </div>
            <Progress value={proposal.progress} className="h-3" />
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="mb-4">Presupuesto</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Gastado / Aprobado</p>
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
          <p className="text-muted-foreground whitespace-pre-line">
            {proposal.description}
          </p>
        </div>

        {/* Tasks */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="mb-6">Tareas</h2>

          <div className="space-y-3">
            {proposal.tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/30"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4>{task.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {task.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Responsable: {task.assignee.name}</span>
                    <span>•</span>
                    <span>Fecha límite: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={
                    task.status === 'Done'
                      ? 'bg-green-500/20 text-green-400 border-green-500/50'
                      : task.status === 'In progress'
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/50'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/50'
                  }
                >
                  {task.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Public Documents */}
        {publicDocuments.length > 0 && (
          <div className="glass-card rounded-xl p-6">
            <h2 className="mb-6">Documentos Públicos</h2>

            <div className="space-y-3">
              {publicDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-background/30"
                >
                  <div>
                    <p className="mb-1">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {doc.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Login prompt */}
        <div className="glass-card rounded-xl p-6 text-center">
          <p className="text-muted-foreground mb-4">
            ¿Eres miembro de esta DAO?
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            Iniciar Sesión para Ver Más
          </Button>
        </div>
      </div>
    </div>
  );
}
