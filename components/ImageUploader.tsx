import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Crop } from "lucide-react";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = useCallback(() => {
    if (image) {
      fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "image.jpg", { type: "image/jpeg" });
          onImageUpload(file);
          setIsDialogOpen(false);
        });
    }
  }, [image, onImageUpload]);

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="p-2 border rounded-md">
        {/* <Button type="button" variant="outline" className="cursor-pointer"> */}
        Select Image
        {/* </Button> */}
      </label>
      {image && (
        <div className="mt-4">
          <Image
            src={image}
            alt="Preview"
            width={300}
            height={300}
            className="rounded-md object-cover"
          />
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Image Upload</DialogTitle>
          </DialogHeader>
          <DialogDescription>Upload this image?</DialogDescription>
          {image && (
            <div className="mt-4">
              <Image
                src={image}
                alt="Preview"
                width={300}
                height={300}
                className="rounded-md object-cover"
              />
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleUpload} className="flex items-center gap-2">
              <Crop className="w-4 h-4" />
              Upload Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
