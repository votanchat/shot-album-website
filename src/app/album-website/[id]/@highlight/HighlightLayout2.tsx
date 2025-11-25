import { JSX } from "react";
import Image from "next/image";
import { MediaFile } from "@/types/album";

interface HighlightLayout2Props {
  images: MediaFile[];
  title: string;
  description: string;
}

export default function HighlightLayout2({
  images,
  title,
  description,
}: HighlightLayout2Props): JSX.Element {
  // Config for 5 images: rotation 6, 4, 0, -4, -6 và spacing 48px
  // Kích thước ảnh: 330px × 450px
  const imageConfigs = [
    { rotate: 6, left: 0 },
    { rotate: 4, left: 378 }, // 330 + 48
    { rotate: 0, left: 756 }, // 378 + 330 + 48
    { rotate: -4, left: 1134 }, // 756 + 330 + 48
    { rotate: -6, left: 1512 }, // 1134 + 330 + 48
  ];

  // Render a single group of 5 images
  const renderImageGroup = (groupKey: number) => {
    // Lấy 5 ảnh cho group này
    const startIndex = groupKey * 5;
    const groupImages = [];
    for (let i = 0; i < 5; i++) {
      const imageIndex = (startIndex + i) % images.length;
      groupImages.push(images[imageIndex]);
    }

    return (
      <div
        key={groupKey}
        className="shrink-0 relative flex items-center justify-center"
        style={{
          width: "100vw",
          height: "550px",
        }}
      >
        {groupImages.map((image, index) => {
          const config = imageConfigs[index];

          return (
            <div
              key={`${groupKey}-${index}`}
              className="absolute"
              style={{
                width: "330px",
                height: "450px",
                left: `calc(50vw - 921px + ${config.left}px)`,
                top: "50px",
                transform: `rotate(${config.rotate}deg)`,
                zIndex: 5 - index,
              }}
            >
              <Image
                src={image.url}
                alt={image.file_name}
                fill
                className="object-cover"
                style={{
                  borderRadius: "24px",
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#f5f4f0" }}
    >
      <div
        className="flex flex-col gap-10"
        style={{
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
      >
        {/* Title & Description */}
        <div className="relative w-full max-w-[1280px] px-20 mx-auto">
          <div className="flex flex-col gap-8">
            <div
              className="flex flex-col gap-5 mx-auto"
              style={{ width: "768px" }}
            >
              <h2
                className="text-center font-bold text-[#101828]"
                style={{
                  fontSize: "48px",
                  lineHeight: "44px",
                }}
              >
                {title}
              </h2>
              <p
                className="text-center text-[#344054]"
                style={{
                  fontSize: "22px",
                  lineHeight: "160%",
                }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Images Frame - Full Width Scrollable */}
        <div
          className="relative w-full overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex">
            {/* Render nhiều groups để loop mãi mãi - 20 groups */}
            {[...Array(20)].map((_, groupIndex) =>
              renderImageGroup(groupIndex)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
