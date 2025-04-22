'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from 'react';
import { generateAffirmation } from '@/ai/flows/generate-affirmation';
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const articleData = [
  {
    title: "The Power of Community",
    description: "Discover how women supporting women can change the world.",
    imageUrl: "https://picsum.photos/400/200",
    link: "#"
  },
  {
    title: "Breaking Barriers",
    description: "Stories of women who have overcome challenges and achieved greatness.",
    imageUrl: "https://picsum.photos/401/200",
    link: "#"
  },
];

const imageData = [
  { imageUrl: "https://picsum.photos/200/200", alt: "Inspiring quote" },
  { imageUrl: "https://picsum.photos/201/200", alt: "Empowerment" },
];

const resourceLinks = [
  { name: "Women Who Code", url: "https://www.womenwhocode.com/" },
  { name: "Girls Who Code", url: "https://girlswhocode.com/" },
];

export default function Home() {
  const [topic, setTopic] = useState('');
  const [mood, setMood] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const result = await generateAffirmation({ topic, mood });
      setAffirmation(result.affirmation);
      toast({
        title: "Affirmation Generated!",
        description: "Your personalized affirmation is ready.",
      });
    } catch (error: any) {
      console.error("Error generating affirmation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate affirmation. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 grid gap-6">
      <Toaster />

      {/* Articles Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Empowering Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articleData.map((article, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="rounded-md mb-4" />
                <Button asChild>
                  <a href={article.link}>Read More</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Image Gallery Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Inspirational Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imageData.map((image, index) => (
            <Image
              key={index}
              src={image.imageUrl}
              alt={image.alt}
              width={200}
              height={200}
              className="rounded-md"
            />
          ))}
        </div>
      </section>

      {/* Affirmation Generator Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Affirmation Generator</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium leading-6 text-gray-900">
              Topic
            </label>
            <div className="mt-2">
              <Input
                type="text"
                name="topic"
                id="topic"
                placeholder="e.g., Career, Relationships"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="mood" className="block text-sm font-medium leading-6 text-gray-900">
              Mood
            </label>
            <div className="mt-2">
              <Textarea
                rows={3}
                name="mood"
                id="mood"
                placeholder="e.g., Confident, Peaceful"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button onClick={generate} disabled={loading}>
              {loading ? "Generating..." : "Generate Affirmation"}
            </Button>
          </div>
          {affirmation && (
            <div className="rounded-md bg-secondary p-4">
              <p className="text-lg font-medium">{affirmation}</p>
            </div>
          )}
        </div>
      </section>

      {/* Resource Links Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Resources</h2>
        <ul>
          {resourceLinks.map((resource, index) => (
            <li key={index} className="mb-2">
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {resource.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}


    