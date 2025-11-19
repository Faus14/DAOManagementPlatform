import { useNavigate } from 'react-router-dom';
import { mockTasks } from '../lib/mock-data';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Plus, Calendar, DollarSign } from 'lucide-react';
import { TaskStatus } from '../types';

interface TaskBoardProps {
  proposalId: string;
}

export function TaskBoard({ proposalId }: TaskBoardProps) {
  const navigate = useNavigate();
  const tasks = mockTasks.filter((t) => t.proposalId === proposalId);

  const columns: { status: TaskStatus; title: string; color: string }[] = [
    { status: 'To do', title: 'Por Hacer', color: 'border-gray-500/50' },
    { status: 'In progress', title: 'En Progreso', color: 'border-blue-500/50' },
    { status: 'Done', title: 'Completado', color: 'border-green-500/50' },
  ];

  const getTaskTypeColor = (type: string) => {
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2>Tablero de Tareas</h2>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Tarea
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.status);

          return (
            <div key={column.status} className="space-y-3">
              <div className={`glass-card rounded-lg p-3 border-t-2 ${column.color}`}>
                <div className="flex items-center justify-between">
                  <h3>{column.title}</h3>
                  <Badge variant="outline" className="bg-background/50">
                    {columnTasks.length}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className="glass-card-hover rounded-lg p-4 cursor-pointer"
                    onClick={() => navigate(`/task/${task.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="flex-1">{task.name}</h4>
                      <Badge
                        variant="outline"
                        className={`${getTaskTypeColor(task.type)} text-xs`}
                      >
                        {task.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback>
                          {task.assignee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {task.assignee.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-400">
                        <DollarSign className="h-3 w-3" />
                        <span>${task.budgetSpent.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="glass-card rounded-lg p-6 text-center text-muted-foreground text-sm">
                    No hay tareas
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
