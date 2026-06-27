import { useState } from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../providers/LanguageProvider";

export function Projects() {
  const { t } = useLanguage();
  const projects = [
    {
      id: 1,
      title: t("projects.ecommerce"),
      description: t("projects.ecommerceDesc"),
      image:
        "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3QlMjBzY3JlZW5zaG90fGVufDF8fHx8MTc3NTE3NjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "web",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 2,
      title: t("projects.taskapp"),
      description: t("projects.taskappDesc"),
      image:
        "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzc1MTE5NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "mobile",
      technologies: ["React Native", "Firebase", "TypeScript"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 3,
      title: t("projects.landing"),
      description: t("projects.landingDesc"),
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      category: "web",
      technologies: ["React", "TypeScript"],
      github: "https://github.com",
      demo: "https://cabanas-la-reserva.vercel.app/",
    },
    {
      id: 4,
      title: t("projects.social"),
      description: t("projects.socialDesc"),
      image:
        "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3QlMjBzY3JlZW5zaG90fGVufDF8fHx8MTc3NTE3NjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "fullstack",
      technologies: ["React", "Express", "Socket.io", "Redis"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ];
  const categories = [
    { value: "all", label: t("projects.all") },
    { value: "web", label: t("projects.web") },
    { value: "mobile", label: t("projects.mobile") },
    { value: "fullstack", label: t("projects.fullstack") },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl mb-4">{t("projects.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Category Filter */}
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-12"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden aspect-video">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button variant="secondary" size="sm" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {t("projects.code")}
                      </a>
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t("projects.demo")}
                      </a>
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {t("projects.noProjects")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
