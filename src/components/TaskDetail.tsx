import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTasks } from '../lib/mock-data';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ArrowLeft, Upload, Download, Calendar, DollarSign, User } from 'lucide-react';
import { TaskStatus, TaskType } from '../types';

export function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = mockTasks.find((t) => t.id === id);

  const [status, setStatus] = useState<TaskStatus>(task?.status || 'To do');

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">Tarea no encontrada</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Volver
          </Button>
        </div>
      </div>
    );
  }

  const getTaskTypeColor = (type: TaskType) => {
    switch (type) {
      case 'Pago':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Logística':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Reserva':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Comunicación':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const budgetProgress = (task.budgetSpent / task.budgetExpected) * 100;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back button */}
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>

        {/* Header */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl">{task.name}</h1>
                <Badge variant="outline" className={getTaskTypeColor(task.type)}>
                  {task.type}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback>
                      {task.assignee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground">Responsable</p>
                    <p className="text-sm">{task.assignee.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha límite</p>
                    <p className="text-sm">{new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 min-w-[200px]">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Estado
                </label>
                <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus)}>
                  <SelectTrigger className="glass-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To do">Por Hacer</SelectItem>
                    <SelectItem value="In progress">En Progreso</SelectItem>
                    <SelectItem value="Done">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Presupuesto Esperado</span>
                <DollarSign className="h-5 w-5 text-indigo-400" />
              </div>
              <p className="text-2xl">${task.budgetExpected.toLocaleString()}</p>
            </div>

            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Presupuesto Gastado</span>
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
              <p className="text-2xl">${task.budgetSpent.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Uso del presupuesto</span>
              <span className={budgetProgress > 100 ? 'text-red-400' : 'text-green-400'}>
                {budgetProgress.toFixed(0)}%
              </span>
            </div>
            <Progress value={Math.min(budgetProgress, 100)} className="h-2" />
          </div>
        </div>

        {/* Description */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="mb-4">Descripción</h2>
          <p className="text-muted-foreground whitespace-pre-line">
            {task.description}
          </p>
        </div>

        {/* Documents */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2>Documentos Adjuntos</h2>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Upload className="mr-2 h-4 w-4" />
              Subir Documento
            </Button>
          </div>

          {task.documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay documentos adjuntos
            </div>
          ) : (
            <div className="space-y-3">
              {task.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-background/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="glass-card rounded-lg p-3">
                      <Download className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="mb-1">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.uploadedBy.name} • {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
