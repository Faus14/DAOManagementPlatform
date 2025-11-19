import { Document } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Download, Upload, Eye } from 'lucide-react';

interface DocumentsListProps {
  documents: Document[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-indigo-400" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2>Documentos</h2>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
          <Upload className="mr-2 h-4 w-4" />
          Subir Documento
        </Button>
      </div>

      {documents.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No hay documentos todavía
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-xl p-6">
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/30 hover:bg-background/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="glass-card rounded-lg p-3">
                    {getFileIcon(doc.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="truncate">{doc.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {doc.type}
                      </Badge>
                      {doc.isPublic && (
                        <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/50">
                          Público
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={doc.uploadedBy.avatar} />
                          <AvatarFallback className="text-xs">
                            {doc.uploadedBy.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{doc.uploadedBy.name}</span>
                      </div>
                      <span>•</span>
                      <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
