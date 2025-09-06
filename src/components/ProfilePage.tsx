import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Camera,
  ShoppingBag,
  MessageCircle,
  Star,
  CheckCircle
} from 'lucide-react';

interface ProfilePageProps {
  setCurrentPage: (page: string) => void;
  userRole: 'student' | 'admin';
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  graduationYear: string;
  bio: string;
  location: string;
  avatar: string;
  joinDate: string;
  rating: number;
  totalSales: number;
  totalPurchases: number;
  verified: boolean;
}

export function ProfilePage({ setCurrentPage, userRole }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Smith',
    email: 'john.smith@university.edu',
    phone: '+1 (555) 123-4567',
    university: 'University of Example',
    major: 'Computer Science',
    graduationYear: '2025',
    bio: 'Passionate computer science student interested in software development and technology. Always looking for great deals on textbooks and electronics!',
    location: 'Boston, MA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: 'September 2024',
    rating: 4.8,
    totalSales: 12,
    totalPurchases: 8,
    verified: true
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Basic validation
      if (!editedProfile.name.trim()) {
        throw new Error('Name is required');
      }
      if (!editedProfile.email.trim()) {
        throw new Error('Email is required');
      }

      setProfile(editedProfile);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: (error as Error).message });
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setMessage(null);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const currentData = isEditing ? editedProfile : profile;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage('dashboard')}
            className="rounded-xl"
          >
            Back to Dashboard
          </Button>
        </div>

        {message && (
          <Alert className={`rounded-xl ${message.type === 'error' ? 'border-destructive bg-destructive/10' : 'border-secondary bg-secondary/10'}`}>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className={message.type === 'error' ? 'text-destructive' : 'text-secondary'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-card border border-border rounded-2xl p-6">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={currentData.avatar} />
                    <AvatarFallback className="text-2xl">
                      {currentData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-center space-x-2">
                    <h2 className="text-xl font-bold text-card-foreground">{currentData.name}</h2>
                    {currentData.verified && (
                      <CheckCircle className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <p className="text-muted-foreground">{currentData.email}</p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{currentData.rating}</span>
                    <span className="text-muted-foreground">rating</span>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <ShoppingBag className="w-4 h-4" />
                      <span className="font-bold">{currentData.totalSales}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Sales</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-bold">{currentData.totalPurchases}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Purchases</p>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Joined {currentData.joinDate}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-card-foreground">Profile Information</h3>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="rounded-xl"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="rounded-xl"
                      disabled={isLoading}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="rounded-xl"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-12 rounded-xl bg-input-background border-0"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 h-12 px-3 bg-muted rounded-xl">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{currentData.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center space-x-2 h-12 px-3 bg-muted rounded-xl">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{currentData.email}</span>
                    <Badge variant="secondary" className="ml-auto">Verified</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="h-12 rounded-xl bg-input-background border-0"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 h-12 px-3 bg-muted rounded-xl">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{currentData.phone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editedProfile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="h-12 rounded-xl bg-input-background border-0"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 h-12 px-3 bg-muted rounded-xl">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{currentData.location}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  {isEditing ? (
                    <Input
                      id="university"
                      value={editedProfile.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      className="h-12 rounded-xl bg-input-background border-0"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 h-12 px-3 bg-muted rounded-xl">
                      <span>{currentData.university}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  {isEditing ? (
                    <Input
                      id="major"
                      value={editedProfile.major}
                      onChange={(e) => handleInputChange('major', e.target.value)}
                      className="h-12 rounded-xl bg-input-background border-0"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 h-12 px-3 bg-muted rounded-xl">
                      <span>{currentData.major}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  {isEditing ? (
                    <Input
                      id="graduationYear"
                      value={editedProfile.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                      className="h-12 rounded-xl bg-input-background border-0"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 h-12 px-3 bg-muted rounded-xl">
                      <span>{currentData.graduationYear}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={editedProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="rounded-xl bg-input-background border-0 min-h-[100px]"
                    placeholder="Tell others about yourself..."
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-xl min-h-[100px]">
                    <p className="text-sm">{currentData.bio}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}