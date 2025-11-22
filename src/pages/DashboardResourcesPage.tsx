import DashboardLayout from '../components/DashboardLayout';
import LockedContentOverlay from '../components/LockedContentOverlay';
import { isContentLocked } from '../utils/contentLock';
import { FileText, Download, FolderOpen, TrendingUp, File, Image, FileSpreadsheet } from 'lucide-react';

export default function DashboardResourcesPage() {
  const contentLocked = isContentLocked();
  const resources = [
    {
      id: 1,
      title: 'Client Retention Checklist',
      description: 'A comprehensive checklist to ensure you\'re maximizing client retention throughout the year.',
      type: 'PDF',
      size: '2.4 MB',
      downloads: 1245,
      category: 'Checklists',
      icon: File,
      color: 'text-red-600'
    },
    {
      id: 2,
      title: 'Tax Season Calendar 2026',
      description: 'Complete calendar with key dates, deadlines, and marketing milestones for tax season.',
      type: 'Template',
      size: '1.8 MB',
      downloads: 2389,
      category: 'Templates',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 3,
      title: 'Social Media Graphics Pack',
      description: 'Ready-to-use social media graphics for Facebook, Instagram, and LinkedIn.',
      type: 'ZIP',
      size: '45.2 MB',
      downloads: 856,
      category: 'Marketing',
      icon: Image,
      color: 'text-purple-600'
    },
    {
      id: 4,
      title: 'Financial Dashboard Template',
      description: 'Excel template to track KPIs, revenue, expenses, and profitability metrics.',
      type: 'XLSX',
      size: '3.1 MB',
      downloads: 1678,
      category: 'Finance',
      icon: FileSpreadsheet,
      color: 'text-green-600'
    },
    {
      id: 5,
      title: 'Employee Training Manual',
      description: 'Complete training manual for onboarding new team members in your practice.',
      type: 'PDF',
      size: '8.7 MB',
      downloads: 945,
      category: 'Operations',
      icon: File,
      color: 'text-red-600'
    },
    {
      id: 6,
      title: 'Marketing Campaign Planner',
      description: 'Strategic planner for organizing and executing successful marketing campaigns.',
      type: 'Template',
      size: '2.2 MB',
      downloads: 1123,
      category: 'Marketing',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 7,
      title: 'Client Welcome Package',
      description: 'Professionally designed welcome package templates to impress new clients.',
      type: 'ZIP',
      size: '12.4 MB',
      downloads: 734,
      category: 'Templates',
      icon: Image,
      color: 'text-purple-600'
    },
    {
      id: 8,
      title: 'Cash Flow Forecast Template',
      description: '13-week cash flow forecast spreadsheet to manage seasonal business cycles.',
      type: 'XLSX',
      size: '1.9 MB',
      downloads: 1456,
      category: 'Finance',
      icon: FileSpreadsheet,
      color: 'text-green-600'
    },
    {
      id: 9,
      title: 'Sales Script Collection',
      description: 'Proven sales scripts for phone calls, consultations, and closing conversations.',
      type: 'PDF',
      size: '1.2 MB',
      downloads: 1890,
      category: 'Sales',
      icon: File,
      color: 'text-red-600'
    },
    {
      id: 10,
      title: 'Brand Guidelines Package',
      description: 'Complete brand guidelines including logos, colors, fonts, and usage examples.',
      type: 'ZIP',
      size: '28.6 MB',
      downloads: 567,
      category: 'Marketing',
      icon: Image,
      color: 'text-purple-600'
    },
    {
      id: 11,
      title: 'Performance Review Template',
      description: 'Structured template for conducting effective employee performance reviews.',
      type: 'Template',
      size: '1.5 MB',
      downloads: 823,
      category: 'Operations',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 12,
      title: 'Client Satisfaction Survey',
      description: 'Customizable survey template to gather feedback and improve service quality.',
      type: 'Template',
      size: '0.8 MB',
      downloads: 1034,
      category: 'Operations',
      icon: FileText,
      color: 'text-blue-600'
    },
  ];

  const categories = ['All', 'Templates', 'Checklists', 'Marketing', 'Finance', 'Operations', 'Sales'];

  return (
    <DashboardLayout>
      <LockedContentOverlay isLocked={contentLocked}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-main mb-2">Resources & Tools</h1>
        <p className="text-slate-600">
          Download templates, handouts, charts, and marketing materials to grow your business
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <FileText size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">50+</h3>
          <p className="text-blue-100">Total Resources</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <Download size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">15.2K</h3>
          <p className="text-green-100">Total Downloads</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <FolderOpen size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">6</h3>
          <p className="text-purple-100">Categories</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-white">
          <TrendingUp size={40} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">New</h3>
          <p className="text-orange-100">Added Weekly</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-semibold text-brand-main">Filter by:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  category === 'All'
                    ? 'bg-brand-main text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <div
              key={resource.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-4 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-colors ${resource.color}`}>
                  <Icon size={32} />
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {resource.type}
                </span>
              </div>

              <h3 className="text-lg font-bold text-brand-main mb-2 group-hover:text-brand-accent transition-colors">
                {resource.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <span>{resource.size}</span>
                <span className="flex items-center gap-1">
                  <Download size={14} />
                  {resource.downloads.toLocaleString()}
                </span>
              </div>

              <button className="w-full bg-brand-main hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <Download size={18} />
                Download
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-r from-brand-accent to-red-900 rounded-2xl p-8 text-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Need Something Specific?</h2>
            <p className="text-red-100 mb-6">
              Can't find what you're looking for? Let us know and we'll create custom resources based on member requests.
            </p>
            <button className="bg-white text-brand-accent px-8 py-3 rounded-full font-bold hover:bg-red-50 transition-colors">
              Request a Resource
            </button>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="font-bold text-xl mb-4">Coming Soon</h3>
            <ul className="space-y-3 text-red-100">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                Video tutorial library
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                Interactive calculators
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                Downloadable webinar recordings
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                Custom report templates
              </li>
            </ul>
          </div>
        </div>
      </div>
      </LockedContentOverlay>
    </DashboardLayout>
  );
}
