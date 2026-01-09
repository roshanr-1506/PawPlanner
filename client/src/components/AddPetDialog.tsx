import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AddPetDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Pet added!",
      description: `${name} has been added to your pet family.`,
    });
    
    setOpen(false);
    setName("");
    setType("");
    setBreed("");
    setAge("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" data-testid="button-add-pet">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Pet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Pet</DialogTitle>
            <DialogDescription>
              Create a profile for your furry friend.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pet-name">Pet Name</Label>
              <Input
                id="pet-name"
                placeholder="e.g., Max"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="input-pet-name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pet-type">Pet Type</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger id="pet-type" data-testid="select-pet-type">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="bird">Bird</SelectItem>
                  <SelectItem value="rabbit">Rabbit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pet-breed">Breed</Label>
              <Input
                id="pet-breed"
                placeholder="e.g., Golden Retriever"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                data-testid="input-pet-breed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pet-age">Age (years)</Label>
              <Input
                id="pet-age"
                type="number"
                placeholder="e.g., 3"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                data-testid="input-pet-age"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" data-testid="button-submit-pet">
              Add Pet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
