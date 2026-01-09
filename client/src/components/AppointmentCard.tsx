import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { format, differenceInDays, parseISO } from "date-fns";

interface AppointmentCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
}

export function AppointmentCard({ id, title, date, time, location, notes }: AppointmentCardProps) {
  const appointmentDate = parseISO(date);
  const daysUntil = differenceInDays(appointmentDate, new Date());
  const isUpcoming = daysUntil >= 0 && daysUntil <= 7;

  return (
    <Card className="p-4" data-testid={`card-appointment-${id}`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium font-display">{title}</h3>
          {isUpcoming && (
            <Badge variant="secondary" className="bg-accent/30">
              {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `In ${daysUntil} days`}
            </Badge>
          )}
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(appointmentDate, "MMMM d, yyyy")}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        {notes && (
          <p className="text-sm text-muted-foreground pt-2 border-t">
            {notes}
          </p>
        )}
      </div>
    </Card>
  );
}
