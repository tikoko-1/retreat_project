import { User, CreditCard, Bell, Shield } from "lucide-react";

export default function SettingsSection() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-light mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account, billing, and notification preferences.</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
          </div>
          <p className="text-gray-600">Update your personal and business information.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Billing & Subscription</h3>
          </div>
          <p className="text-gray-600">Manage your subscription plan and payment methods.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          </div>
          <p className="text-gray-600">Configure email and push notification preferences.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Security</h3>
          </div>
          <p className="text-gray-600">Update password and manage account security settings.</p>
        </div>
      </div>
    </div>
  );
}