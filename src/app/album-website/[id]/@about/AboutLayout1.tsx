"use client";

import { JSX } from "react";
import Image from "next/image";
import { AboutSection } from "@/types/album";
import { useTheme } from "@/hooks/useTheme";
import { INTERFACE_MODE } from "@/constans/common";

interface AboutLayout1Props {
  about: AboutSection;
}

export default function AboutLayout1({
  about,
}: AboutLayout1Props): JSX.Element {
  const { interfaceMode, themeColors } = useTheme();
  const isDark = interfaceMode === INTERFACE_MODE.DARK;

  /**
   * Parse content string with newlines into array of text items
   */
  const parseContent = (content: string): string[] => {
    return content.split("\n").filter((line) => line.trim() !== "");
  };

  return (
    <section
      className="relative overflow-hidden -mt-px"
      style={{
        backgroundColor: isDark ? themeColors.primary1 : "white",
        border: "none",
        borderTop: "none",
        boxShadow: "none",
        outline: "none",
      }}
    >
      <div className="pt-24 flex flex-col gap-24">
        {/* Container - Title & Description */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 max-w-[768px] mx-auto">
              <h2
                className="text-center font-bold text-[48px] leading-[44px]"
                style={{
                  color: isDark ? "white" : "#101828",
                }}
              >
                {about.title}
              </h2>
              <p
                className="text-center text-[22px] leading-[160%]"
                style={{
                  color: isDark ? "white" : "#344054",
                }}
              >
                {about.description}
              </p>
            </div>
          </div>
        </div>

        {/* SubContent Items - Alternating Layout */}
        <div className="relative flex flex-col">
          {about.subContent.map((item, index) => {
            const contentLines = parseContent(item.content);
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="w-full flex relative pb-24">
                {/* Decorative Icon - Alternating */}
                {isEven ? (
                  <div className="absolute left-0 bottom-0 z-10">
                    <Image
                      src="/icons/about1.svg"
                      alt="About decoration"
                      width={150}
                      height={250}
                    />
                  </div>
                ) : (
                  <div className="absolute right-0 bottom-0 z-10">
                    <Image
                      src="/icons/about2.svg"
                      alt="About decoration"
                      width={150}
                      height={250}
                    />
                  </div>
                )}

                {isEven ? (
                  <>
                    {/* Text Content - Left */}
                    <div className="w-[720px] flex items-center justify-end pr-16 py-24 relative z-20">
                      <div className="w-[496px] flex flex-col gap-8">
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-4">
                            <h3
                              className="font-semibold text-[30px] leading-[38px]"
                              style={{
                                color: isDark ? "white" : "#101828",
                              }}
                            >
                              {item.title}
                            </h3>
                            <p
                              className="text-[18px] leading-[28px]"
                              style={{
                                color: isDark ? "white" : "#475467",
                              }}
                            >
                              {contentLines[0]}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5 pl-4">
                          {contentLines.slice(1).map((line, lineIndex) => (
                            <div
                              key={lineIndex}
                              className="flex items-start gap-3"
                            >
                              {/* Checkmark Icon */}
                              <div
                                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundColor: "var(--color-primary-4)",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="13"
                                  viewBox="0 0 14 13"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.5375 0.320176L4.18414 8.38184L1.96747 6.01351C1.55914 5.62851 0.917473 5.60518 0.450807 5.93184C-0.00419315 6.27018 -0.132527 6.86518 0.147473 7.34351L2.77247 11.6135C3.02914 12.0102 3.47247 12.2552 3.97414 12.2552C4.45247 12.2552 4.90747 12.0102 5.16414 11.6135C5.58414 11.0652 13.5991 1.51018 13.5991 1.51018C14.6491 0.436843 13.3775 -0.508157 12.5375 0.30851V0.320176Z"
                                    fill="var(--color-primary-1)"
                                  />
                                </svg>
                              </div>
                              <p
                                className="text-[18px] leading-[28px] w-[440px]"
                                style={{
                                  color: isDark ? "white" : "#475467",
                                }}
                              >
                                {line}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Image - Right */}
                    <div className="w-[720px] h-[560px] relative z-20">
                      {item.image && item.image.length > 0 && (
                        <div className="relative w-full h-full">
                          <Image
                            src={item.image[0].url}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="720px"
                          />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Image - Left */}
                    <div className="w-[720px] h-[560px] relative z-20">
                      {item.image && item.image.length > 0 && (
                        <div className="relative w-full h-full">
                          <Image
                            src={item.image[0].url}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="720px"
                          />
                        </div>
                      )}
                    </div>

                    {/* Text Content - Right */}
                    <div className="w-[720px] flex items-center pl-16 py-24 relative z-20">
                      <div className="w-[496px] flex flex-col gap-8">
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-4">
                            <h3
                              className="font-semibold text-[30px] leading-[38px]"
                              style={{
                                color: isDark ? "white" : "#101828",
                              }}
                            >
                              {item.title}
                            </h3>
                            <p
                              className="text-[18px] leading-[28px]"
                              style={{
                                color: isDark ? "white" : "#475467",
                              }}
                            >
                              {contentLines[0]}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5 pl-4">
                          {contentLines.slice(1).map((line, lineIndex) => (
                            <div
                              key={lineIndex}
                              className="flex items-start gap-3"
                            >
                              {/* Checkmark Icon */}
                              <div
                                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundColor: "var(--color-primary-4)",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="13"
                                  viewBox="0 0 14 13"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.5375 0.320176L4.18414 8.38184L1.96747 6.01351C1.55914 5.62851 0.917473 5.60518 0.450807 5.93184C-0.00419315 6.27018 -0.132527 6.86518 0.147473 7.34351L2.77247 11.6135C3.02914 12.0102 3.47247 12.2552 3.97414 12.2552C4.45247 12.2552 4.90747 12.0102 5.16414 11.6135C5.58414 11.0652 13.5991 1.51018 13.5991 1.51018C14.6491 0.436843 13.3775 -0.508157 12.5375 0.30851V0.320176Z"
                                    fill="var(--color-primary-1)"
                                  />
                                </svg>
                              </div>
                              <p
                                className="text-[18px] leading-[28px] w-[440px]"
                                style={{
                                  color: isDark ? "white" : "#475467",
                                }}
                              >
                                {line}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
