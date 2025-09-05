export type ViewMode = 'home' | 'retreat-center' | 'dashboard' | 'centers' | 'guides' | 'guide-detail' | 'blog' | 'blog-detail' | 'about';

export interface NavigationHandlers {
  onNavigateToHome: () => void;
  onNavigateToCatalog: (filters?: any) => void;
  onNavigateToHostPortal: () => void;
  onNavigateToGuides: () => void;
  onNavigateToBlog: () => void;
  onNavigateToAbout: () => void;
  onNavigateToGuideDetail: (slug: string) => void;
  onNavigateToBlogPost: (slug: string) => void;
  onSelectRetreat: (id: string) => void;
}

export function createNavigationHandlers(
  setCurrentView: (view: ViewMode) => void,
  setCurrentGuideSlug: (slug: string) => void,
  setCurrentBlogSlug: (slug: string) => void
): NavigationHandlers {
  return {
    onNavigateToHome: () => setCurrentView('home'),
    onNavigateToCatalog: () => setCurrentView('centers'),
    onNavigateToHostPortal: () => setCurrentView('dashboard'),
    onNavigateToGuides: () => setCurrentView('guides'),
    onNavigateToBlog: () => setCurrentView('blog'),
    onNavigateToAbout: () => setCurrentView('about'),
    onNavigateToGuideDetail: (slug: string) => {
      setCurrentGuideSlug(slug);
      setCurrentView('guide-detail');
    },
    onNavigateToBlogPost: (slug: string) => {
      setCurrentBlogSlug(slug);
      setCurrentView('blog-detail');
    },
    onSelectRetreat: () => setCurrentView('retreat-center')
  };
}