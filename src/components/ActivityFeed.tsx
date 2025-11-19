import { ActivityItem } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FileText, CheckCircle, UserPlus, DollarSign } from 'lucide-react';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'status_change':
        return <CheckCircle className="h-5 w-5 text-blue-400" />;
      case 'document_upload':
        return <FileText className="h-5 w-5 text-green-400" />;
      case 'assignment':
        return <UserPlus className="h-5 w-5 text-purple-400" />;
      case 'budget_update':
        return <DollarSign className="h-5 w-5 text-yellow-400" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Hace un momento';
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
    return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
  };

  return (
    <div className="space-y-4">
      <h2>Línea de Tiempo</h2>

      {activities.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="text-muted-foreground">
            No hay actividad reciente
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-xl p-6">
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={activity.id} className="relative">
                {index !== activities.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-px bg-border" />
                )}

                <div className="flex gap-4">
                  <div className="glass-card rounded-full p-2 h-12 w-12 flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="flex-1">{activity.description}</p>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback className="text-xs">
                          {activity.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {activity.user.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
