import React from 'react';
import Icon from '../../../components/AppIcon';

const ScanningInstructions = ({ isVisible }) => {
  if (!isVisible) return null;

  const instructions = [
    {
      icon: 'Camera',
      title: 'Position Camera',
      description: 'Hold your device steady and point the camera at the QR code'
    },
    {
      icon: 'Square',
      title: 'Frame the Code',
      description: 'Ensure the QR code fits completely within the scanning frame'
    },
    {
      icon: 'Sun',
      title: 'Good Lighting',
      description: 'Make sure there is adequate lighting for clear code visibility'
    },
    {
      icon: 'Zap',
      title: 'Auto Detection',
      description: 'The system will automatically detect and process the QR code'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Icon name="HelpCircle" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-foreground">Scanning Instructions</h3>
          <p className="text-sm text-muted-foreground">Follow these steps for successful scanning</p>
        </div>
      </div>
      <div className="space-y-4">
        {instructions?.map((instruction, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={instruction?.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {instruction?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {instruction?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Troubleshooting</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• If camera doesn't start, check browser permissions</li>
              <li>• For blurry images, clean your camera lens</li>
              <li>• Use manual entry if scanning continues to fail</li>
              <li>• Ensure QR code is not damaged or expired</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanningInstructions;