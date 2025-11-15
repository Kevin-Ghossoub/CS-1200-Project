
import React, { useState, useCallback } from 'react';
import Button from '../components/common/Button';
import { ArrowLeftIcon, CloudArrowUpIcon } from '../components/icons';
import { useAppContext } from '../context/AppContext';

const UploadFilePage: React.FC = () => {
    const { setPage } = useAppContext();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="bg-white h-full p-6 flex flex-col">
            <header className="flex items-center">
                <button onClick={() => setPage('userInput')} className="p-2 -ml-2 mr-2">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
                </button>
            </header>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                 <div className="p-8 bg-blue-50 rounded-2xl">
                    <h2 className="text-xl font-bold text-gray-900">Upload Your Files</h2>
                    <p className="mt-1 text-sm text-gray-600">Drag and drop documents, images, or media.</p>

                    <div 
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={`mt-6 p-10 border-2 border-dashed rounded-lg ${isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                    >
                        <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400" />
                        {file ? (
                             <p className="mt-2 font-semibold text-gray-800">{file.name}</p>
                        ): (
                            <p className="mt-2 text-sm text-gray-500">
                                Drag & drop files here or{' '}
                                <label htmlFor="file-upload" className="font-semibold text-blue-600 cursor-pointer hover:underline">
                                    Browse Files
                                </label>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                            </p>
                        )}
                    </div>

                    <Button fullWidth className="mt-6" disabled={!file}>
                        Upload
                    </Button>
                    <p className="mt-2 text-xs text-gray-500">Max 100MB per file. Supported: PDF, PNG, JPG.</p>
                </div>
            </div>
        </div>
    );
};

export default UploadFilePage;
