import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Images, Upload, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Booth', icon: Camera },
    { path: '/gallery', label: 'My Gallery', icon: Images },
    { path: '/public', label: 'Public', icon: Upload },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl gradient-candy flex items-center justify-center shadow-button group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-gradient hidden sm:inline">
            CuteBooth
          </span>
        </Link>

        <nav className="flex items-center gap-1 bg-muted/50 p-1 rounded-2xl">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm',
                'transition-all duration-200',
                location.pathname === path
                  ? 'bg-primary text-primary-foreground shadow-button'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
