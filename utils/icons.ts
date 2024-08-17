import { markRaw } from 'vue';

const iconFiles = import.meta.glob('~/assets/icons/*.svg');

const icons: Record<string, any> = {};

// Transform the iconFiles object into a direct mapping from iconName to import function
Object.entries(iconFiles).forEach(([path, ImportedIcon]) => {
  const iconName = path.split('/').pop()?.replace('.svg', '');
  if (iconName) {
    icons[iconName] = markRaw(ImportedIcon);
  }
});

export const getIconComponent = async (iconName: string) => {
  try {
    const iconComponent = icons[iconName];
    if (iconComponent) {
      return iconComponent;
    }
    console.error(`Icon not found: ${iconName}`);
    return null;
  } catch (error) {
    console.error(`Failed to load icon: ${iconName}`, error);
    return null;
  }
};
