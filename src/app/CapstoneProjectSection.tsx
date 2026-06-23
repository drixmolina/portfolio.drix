// Featured Capstone Project Section Component
import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Download, FileText, ExternalLink, Code2, Zap, Target, Layers, BookOpen } from "lucide-react";
import { CapstoneProject, getCapstoneProject } from "./certificateUtils";

interface CapstoneProjectSectionProps {
  glass: React.CSSProperties;
  glassMid: React.CSSProperties;
}

export function CapstoneProjectSection({
  glass,
  glassMid,
}: CapstoneProjectSectionProps) {
  const project = getCapstoneProject();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cycleImage = (direction: number) => {
    setCurrentImageIndex((prev) => (prev + direction + project.screenshots.length) % project.screenshots.length);
  };

  return (
    <>
      <section id="capstone" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-xs font-jetbrains tracking-[0.3em] uppercase mb-4 block" style={{ color: "#D72323" }}>Featured Project</span>
            <h2 className="text-4xl md:text-5xl font-bold font-sora mb-5" style={{ color: "#F5EDED" }}>Capstone Project</h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(245,237,237,0.45)" }}>A premium case study showcasing full-stack development, AI integration, and modern web technologies.</p>
          </div>

          <div ref={ref} className="max-w-6xl mx-auto space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer h-96"
            >
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h2 className="text-4xl md:text-5xl font-bold font-sora mb-3" style={{ color: "#F5EDED" }}>
                  {project.title}
                </h2>
                <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(245,237,237,0.8)" }}>
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Objectives */}
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 transition-all"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                  >
                    <Target size={20} />
                  </div>
                  <h3 className="font-bold font-sora" style={{ color: "#F5EDED" }}>
                    Objectives
                  </h3>
                </div>
                <ul className="space-y-2">
                  {project.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span style={{ color: "#D72323" }} className="mt-1 flex-shrink-0">
                        •
                      </span>
                      <span style={{ color: "rgba(245,237,237,0.7)" }}>{obj}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Problem Statement */}
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 transition-all"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                  >
                    <Zap size={20} />
                  </div>
                  <h3 className="font-bold font-sora" style={{ color: "#F5EDED" }}>
                    Challenge
                  </h3>
                </div>
                <p style={{ color: "rgba(245,237,237,0.7)" }} className="text-sm leading-relaxed">
                  {project.problemStatement}
                </p>
              </motion.div>

              {/* Features Preview */}
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-6 transition-all"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                  >
                    <Code2 size={20} />
                  </div>
                  <h3 className="font-bold font-sora" style={{ color: "#F5EDED" }}>
                    Key Features
                  </h3>
                </div>
                <ul className="space-y-2">
                  {project.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span style={{ color: "#D72323" }} className="mt-1 flex-shrink-0">
                        ✓
                      </span>
                      <span style={{ color: "rgba(245,237,237,0.7)" }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Technology Stack */}
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl p-8 transition-all"
              style={glassMid}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                >
                  <Layers size={24} />
                </div>
                <h3 className="text-2xl font-bold font-sora" style={{ color: "#F5EDED" }}>
                  Technology Stack
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.techStack.map((tech, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 rounded-xl text-center text-sm font-jetbrains"
                    style={{ background: "rgba(215,35,35,0.1)", border: "1px solid rgba(215,35,35,0.2)", color: "#D72323" }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Screenshot Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-8 transition-all overflow-hidden"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                  >
                    <FileText size={24} />
                  </div>
                  <h3 className="text-2xl font-bold font-sora" style={{ color: "#F5EDED" }}>
                    Project Screenshots
                  </h3>
                </div>

                <div className="relative">
                  <img
                    src={project.screenshots[currentImageIndex]}
                    alt={`Screenshot ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover rounded-xl"
                  />

                  {/* Navigation Buttons */}
                  {project.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={() => cycleImage(-1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: "rgba(215,35,35,0.3)", color: "#D72323" }}
                      >
                        ←
                      </button>
                      <button
                        onClick={() => cycleImage(1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: "rgba(215,35,35,0.3)", color: "#D72323" }}
                      >
                        →
                      </button>
                    </>
                  )}
                </div>

                <p className="text-center text-xs font-jetbrains mt-4" style={{ color: "rgba(245,237,237,0.4)" }}>
                  {currentImageIndex + 1} / {project.screenshots.length}
                </p>
              </motion.div>
            )}

            {/* Development Process */}
            {project.developmentProcess && project.developmentProcess.length > 0 && (
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-8 transition-all"
                style={glassMid}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                  >
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-2xl font-bold font-sora" style={{ color: "#F5EDED" }}>
                    Development Process
                  </h3>
                </div>

                <div className="space-y-3">
                  {project.developmentProcess.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm"
                        style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                      >
                        {i + 1}
                      </div>
                      <p style={{ color: "rgba(245,237,237,0.7)" }} className="text-sm pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Architecture & Documentation */}
            {project.architecture && (
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-8 transition-all"
                style={glassMid}
              >
                <h3 className="text-2xl font-bold font-sora mb-4" style={{ color: "#F5EDED" }}>
                  Architecture
                </h3>
                <p style={{ color: "rgba(245,237,237,0.7)" }} className="text-sm leading-relaxed">
                  {project.architecture}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {project.documentation && (
                <motion.a
                  href={project.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-jetbrains font-semibold transition-all"
                  style={{
                    border: "2px solid #D72323",
                    color: "#D72323",
                    background: "transparent",
                  }}
                >
                  <FileText size={18} /> View Documentation
                </motion.a>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-jetbrains font-semibold transition-all text-white"
                style={{
                  background: "linear-gradient(135deg,#D72323,#D72323)",
                  boxShadow: "0 4px 22px rgba(215,35,35,0.42)",
                }}
              >
                <ExternalLink size={18} /> View Project
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65 }}
                    className="relative rounded-3xl overflow-hidden group cursor-pointer h-96"
                  >
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <h2 className="text-4xl md:text-5xl font-bold font-sora mb-3" style={{ color: "#F5EDED" }}>
                        {project.title}
                      </h2>
                      <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(245,237,237,0.8)" }}>
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                )
              }
            )}

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Objectives */}
              {FadeIn(
                {
                  delay: 0.15,
                  children: (
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="rounded-2xl p-6 transition-all"
                      style={glassMid}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                        >
                          <Target size={20} />
                        </div>
                        <h3 className="font-bold font-sora" style={{ color: "#F5EDED" }}>
                          Objectives
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {project.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span style={{ color: "#D72323" }} className="mt-1 flex-shrink-0">
                              •
                            </span>
                            <span style={{ color: "rgba(245,237,237,0.7)" }}>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )
                }
              )}

              {/* Problem Statement */}
              {FadeIn(
                {
                  delay: 0.2,
                  children: (
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="rounded-2xl p-6 transition-all"
                      style={glassMid}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                        >
                          <Zap size={20} />
                        </div>
                        <h3 className="font-bold font-sora" style={{ color: "#F5EDED" }}>
                          Challenge
                        </h3>
                      </div>
                      <p style={{ color: "rgba(245,237,237,0.7)" }} className="text-sm leading-relaxed">
                        {project.problemStatement}
                      </p>
                    </motion.div>
                  )
                }
              )}

              {/* Features Preview */}
              {FadeIn(
                {
                  delay: 0.25,
                  children: (
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="rounded-2xl p-6 transition-all"
                      style={glassMid}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                        >
                          <Code2 size={20} />
                        </div>
                        <h3 className="font-bold font-sora" style={{ color: "#F5EDED" }}>
                          Key Features
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {project.features.slice(0, 5).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span style={{ color: "#D72323" }} className="mt-1 flex-shrink-0">
                              ✓
                            </span>
                            <span style={{ color: "rgba(245,237,237,0.7)" }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )
                }
              )}
            </div>

            {/* Technology Stack */}
            {FadeIn(
              {
                delay: 0.3,
                children: (
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="rounded-2xl p-8 transition-all"
                    style={glassMid}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                      >
                        <Layers size={24} />
                      </div>
                      <h3 className="text-2xl font-bold font-sora" style={{ color: "#F5EDED" }}>
                        Technology Stack
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {project.techStack.map((tech) => (
                        <div
                          key={tech}
                          className="p-3 rounded-xl text-center text-sm font-jetbrains transition-all hover:scale-105"
                          style={{
                            background: "rgba(215,35,35,0.1)",
                            border: "1px solid rgba(215,35,35,0.25)",
                            color: "#F5EDED",
                          }}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              }
            )}

            {/* Screenshots Gallery */}
            {FadeIn(
              {
                delay: 0.35,
                children: (
                  <motion.div className="rounded-2xl p-8 transition-all" style={glassMid}>
                    <h3 className="text-2xl font-bold font-sora mb-6" style={{ color: "#F5EDED" }}>
                      Gallery
                    </h3>
                    <div className="relative">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-xl overflow-hidden h-96"
                      >
                        <img
                          src={project.screenshots[currentImageIndex].url}
                          alt={project.screenshots[currentImageIndex].caption}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <p className="text-center mt-3 text-sm" style={{ color: "rgba(245,237,237,0.6)" }}>
                        {project.screenshots[currentImageIndex].caption}
                      </p>

                      {/* Navigation */}
                      <div className="flex items-center justify-center gap-4 mt-6">
                        <button
                          onClick={() => cycleImage(-1)}
                          className="px-6 py-2 rounded-lg font-jetbrains text-sm transition-all hover:scale-105"
                          style={{ background: "rgba(215,35,35,0.2)", color: "#D72323", border: "1px solid rgba(215,35,35,0.3)" }}
                        >
                          ← Previous
                        </button>
                        <span style={{ color: "rgba(245,237,237,0.4)" }}>
                          {currentImageIndex + 1} / {project.screenshots.length}
                        </span>
                        <button
                          onClick={() => cycleImage(1)}
                          className="px-6 py-2 rounded-lg font-jetbrains text-sm transition-all hover:scale-105"
                          style={{ background: "rgba(215,35,35,0.2)", color: "#D72323", border: "1px solid rgba(215,35,35,0.3)" }}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              }
            )}

            {/* Development Process & Architecture */}
            <div className="grid md:grid-cols-2 gap-6">
              {FadeIn(
                {
                  delay: 0.4,
                  children: (
                    <motion.div className="rounded-2xl p-8 transition-all" style={glassMid}>
                      <h3 className="text-xl font-bold font-sora mb-4" style={{ color: "#F5EDED" }}>
                        Development Process
                      </h3>
                      <div className="space-y-2">
                        {project.developmentProcess.map((step, i) => (
                          <div key={i} className="flex gap-3">
                            <span
                              className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0"
                              style={{ background: "rgba(215,35,35,0.2)", color: "#D72323" }}
                            >
                              {i + 1}
                            </span>
                            <span style={{ color: "rgba(245,237,237,0.7)" }}>{step}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                }
              )}

              {FadeIn(
                {
                  delay: 0.45,
                  children: (
                    <motion.div className="rounded-2xl p-8 transition-all" style={glassMid}>
                      <div className="flex items-center gap-3 mb-4">
                        <BookOpen size={24} style={{ color: "#D72323" }} />
                        <h3 className="text-xl font-bold font-sora" style={{ color: "#F5EDED" }}>
                          Architecture
                        </h3>
                      </div>
                      <p style={{ color: "rgba(245,237,237,0.7)" }} className="text-sm leading-relaxed whitespace-pre-wrap">
                        {project.architecture}
                      </p>
                    </motion.div>
                  )
                }
              )}
            </div>

            {/* Action Buttons */}
            {FadeIn(
              {
                delay: 0.5,
                children: (
                  <div className="flex flex-wrap gap-4 justify-center pt-8">
                    {project.documentation && (
                      <motion.a
                        href={project.documentation.url}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-jetbrains font-semibold text-sm transition-all"
                        style={{
                          background: "rgba(215,35,35,0.2)",
                          color: "#F5EDED",
                          border: "1px solid rgba(215,35,35,0.4)",
                        }}
                      >
                        <FileText size={16} /> {project.documentation.title}
                      </motion.a>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-jetbrains font-semibold text-sm transition-all"
                      style={{
                        background: "linear-gradient(135deg,#D72323,#D72323)",
                        color: "#ffffff",
                        boxShadow: "0 4px 28px rgba(215,35,35,0.45)",
                      }}
                    >
                      <ExternalLink size={16} /> View Project
                    </motion.button>
                  </div>
                )
              }
            )}
          </div>
        </div>
      </section>
    </>
  );
}
