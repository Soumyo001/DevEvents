'use client'
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import UploadToCloudinary from '@/lib/helpers/upload/upload-image';
import { Button } from './ui/button';

type props = {
  value: string|undefined;
  onChange: (val: string) => void;
}

const ImageUpload = ({value, onChange}: props) => {
    const [uploading, setUploading] = useState<boolean>(false);

    const handleUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if(!file) return;
      if(file.size > 5*1024*1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setUploading(true);
      try {
        const url = await UploadToCloudinary(file);
        onChange(url);
        toast.success("Image uploaded");
      } catch (err: any) {
        toast.error(`Image upload failed. ${err.message}`);
      } finally {
        setUploading(false);
      }
    }
    return (
      <label 
          htmlFor="cover"
          className={cn(
            "relative flex h-52 max-sm:h-35 cursor-pointer justify-center items-center bg-linear-to-br from-primary/8 via-muted to-primary/10 transition-colors duration-200 hover:bg-muted/30",
            value && "bg-cover bg-center"
          )}
          style={value ? {backgroundImage: `url(${value})`} : undefined}
      >
          {uploading && <div className='absolute inset-0 bg-background/70 flex items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground'/>
          </div>}

          {!value && !uploading && 
          <div className="flex flex-col justify-center items-center text-muted-foreground">
            <ImageIcon className="mb-2 h-6 w-6"/>
            <span className="text-sm font-medium">Upload cover image</span>
            <span className="text-xs tracking-tight">PNG or JPG upto 5MB</span>
          </div>}

          {value && !uploading && <Button
            className='absolute top-3 right-3 text-primary-foreground cursor-pointer'
            variant={'outline'}
            size={'icon-sm'}
            onClick={(e) => {
              e.preventDefault();
              onChange("");
            }}
          >
            <X className='h-4 w-4'/>
          </Button>}
          <input 
            id="cover"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            disabled={uploading}
            onChange={handleUpload}
          />
      </label>
    )
}

export default ImageUpload