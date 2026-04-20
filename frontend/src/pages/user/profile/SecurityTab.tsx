import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/Button';
import { requestEmailChange, passwordChange } from '@/services/user/profileService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useOtpTimer } from '@/hooks/useOtpTimer';

const SecurityTab = () => {
  const { startTimer } = useOtpTimer();

  const navigate = useNavigate();
   const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ password?: string; confirm?: string }>({});

  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
 
 
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    setLoadingPassword(true);
    e.preventDefault();
    if (!currentPassword || currentPassword.trim() === '') {
      toast.error('Please enter a valid password.');
      return;
    }

    const trimmedPassword = newPassword.trim();
    const trimmedConfirm = confirmPassword.trim();

    const errors: { password?: string; confirm?: string } = {};

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (!passwordRegex.test(trimmedPassword)) {
      errors.password =
        'Password must be at least 6 characters, include one letter, one number, and one special character.';
    }

    if (trimmedPassword !== trimmedConfirm) {
      errors.confirm = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    try {
      const response = await passwordChange(currentPassword, newPassword);
      toast.success('password changed successfully');
      navigate('/account/profile');
    } catch (error: any) {
      toast.error(error.response.data.message || 'Failed to reset password');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
<div className="w-full max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">      <h2 className="text-xl font-semibold mb-4 text-center">Security Settings</h2>

      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <div>
          <Label>Current Password</Label>
          <Input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            placeholder="Current password"
          />
        </div>

        <div>
          <Label>New Password</Label>
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="New password"
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
          )}
        </div>

        <div>
          <Label>Confirm Password</Label>
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"
          />
          {formErrors.confirm && (
            <p className="text-red-500 text-xs mt-1">{formErrors.confirm}</p>
          )}
        </div>

        <button
          className="w-full bg-blue-600 p-2 rounded-md text-white hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loadingPassword}
        >
          {loadingPassword ? 'Loading...' : 'Change Password'}
        </button>
      </form>
    </div>
 );
};

export default SecurityTab;
