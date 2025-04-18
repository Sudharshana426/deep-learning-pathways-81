
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (achievement: any) => void;
  type: 'hackathon' | 'competition' | 'paper';
}

const AddAchievementModal = ({ isOpen, onClose, onAdd, type }: AddAchievementModalProps) => {
  // Common fields
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  // Hackathon specific fields
  const [position, setPosition] = useState("");
  const [category, setCategory] = useState("");
  const [project, setProject] = useState("");
  const [teamSize, setTeamSize] = useState("");
  
  // Competition specific fields
  const [team, setTeam] = useState("Individual");
  
  // Paper specific fields
  const [authors, setAuthors] = useState("");
  const [publication, setPublication] = useState("");
  const [doi, setDoi] = useState("");
  const [abstract, setAbstract] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create URL for the uploaded file
    const fileURL = file ? URL.createObjectURL(file) : "";
    
    // Create new achievement object based on type
    let newAchievement: any = {
      id: Date.now(),
      fileURL,
      fileName: file?.name || ""
    };
    
    if (type === 'hackathon') {
      newAchievement = {
        ...newAchievement,
        name,
        date,
        position,
        category,
        project,
        teamSize: parseInt(teamSize) || 1,
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      };
    } else if (type === 'competition') {
      newAchievement = {
        ...newAchievement,
        name,
        date,
        position,
        category,
        team,
        certificate: file !== null
      };
    } else if (type === 'paper') {
      newAchievement = {
        ...newAchievement,
        title: name,
        authors,
        publication,
        date,
        doi,
        abstract
      };
    }
    
    onAdd(newAchievement);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setName("");
    setDate("");
    setPosition("");
    setCategory("");
    setProject("");
    setTeamSize("");
    setTeam("Individual");
    setAuthors("");
    setPublication("");
    setDoi("");
    setAbstract("");
    setFile(null);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New {type.charAt(0).toUpperCase() + type.slice(1)}</DialogTitle>
          <DialogDescription>
            Enter the details to add it to your achievements.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Common fields */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">{type === 'paper' ? 'Title' : 'Name'}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g., March 15-17, 2023"
                className="col-span-3"
                required
              />
            </div>
            
            {/* Hackathon specific fields */}
            {type === 'hackathon' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">Position</Label>
                  <Input
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g., Winner, 2nd Place"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Smart Education"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project" className="text-right">Project</Label>
                  <Input
                    id="project"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    placeholder="e.g., AI-Powered Learning Assistant"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teamSize" className="text-right">Team Size</Label>
                  <Input
                    id="teamSize"
                    type="number"
                    min="1"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
              </>
            )}
            
            {/* Competition specific fields */}
            {type === 'competition' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">Position/Rank</Label>
                  <Input
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g., 6th Rank, Top 15%"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Competitive Programming"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team" className="text-right">Participation</Label>
                  <Select 
                    value={team} 
                    onValueChange={setTeam}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select participation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Team">Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {team === "Team" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="teamName" className="text-right">Team Name</Label>
                    <Input
                      id="teamName"
                      placeholder="e.g., Code Crusaders"
                      className="col-span-3"
                    />
                  </div>
                )}
              </>
            )}
            
            {/* Paper specific fields */}
            {type === 'paper' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="authors" className="text-right">Authors</Label>
                  <Input
                    id="authors"
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                    placeholder="e.g., Sharma R., Patel V., Gupta S."
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="publication" className="text-right">Publication</Label>
                  <Input
                    id="publication"
                    value={publication}
                    onChange={(e) => setPublication(e.target.value)}
                    placeholder="e.g., IEEE International Conference"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="doi" className="text-right">DOI</Label>
                  <Input
                    id="doi"
                    value={doi}
                    onChange={(e) => setDoi(e.target.value)}
                    placeholder="e.g., 10.1109/ICET.2023.123456"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="abstract" className="text-right">Abstract</Label>
                  <Input
                    id="abstract"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
              </>
            )}
            
            {/* File upload for all types */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                {type === 'hackathon' ? 'Project Image/PDF' : 
                 type === 'competition' ? 'Certificate' : 'Paper PDF'}
              </Label>
              <Input
                id="file"
                type="file"
                accept={type === 'paper' ? ".pdf" : ".pdf,.jpg,.jpeg,.png"}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add {type.charAt(0).toUpperCase() + type.slice(1)}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAchievementModal;
