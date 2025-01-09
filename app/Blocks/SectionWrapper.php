<?php

namespace App\Blocks;

use InvalidArgumentException;
use stdClass;

class BackgroundMedia {
    // Placeholder for potential shared logic or constants related to background media
}

class SectionWrapper extends Block
{
    private const MEDIA_TYPE_IMAGE = 'image';
    private const MEDIA_TYPE_VIDEO = 'video';
    private const MEDIA_TYPE_ANIMATION = 'animation';

    protected function prepareData($attributes, $content): array
    {
        $spacingClasses = $this->getSpacingClasses($attributes);
        $backgroundColorClass = $this->getColorClass($attributes, 'backgroundColor');
        $overlayColorClass = ($attributes['isIncludeOverlay'] ?? false) ? $this->getColorClass($attributes, 'overlayColor') : '';
        $fullViewportHeightClass = $this->getFullViewportClass($attributes);

        $backgroundMedia = $this->getBackgroundMedia($attributes);

        $wrapperAttributes = get_block_wrapper_attributes([
            'class' => implode(' ', array_filter([
                '!max-w-full mx-auto relative isolate overflow-hidden mb-14 md:mb-24 last-of-type:mb-0 py-16',
                $backgroundColorClass,
                $fullViewportHeightClass,
                $spacingClasses,
            ])),
            'id' => $attributes['anchor'] ?? '',
        ]);

        return [
            'wrapperAttributes'   => $wrapperAttributes,
            'overlayColorClass'   => $overlayColorClass,
            'backgroundMedia'     => $backgroundMedia,
            'content'             => $content
        ];
    }

    private function getSpacingClasses(array $attributes, string $desktopPrefix = 'md:spc-', string $mobilePrefix = 'spc-'): string {
        $classes = [];

        if (!isset($attributes['spacing']) || !is_array($attributes['spacing'])) {
            return '';
        }

        $types = ['margin', 'padding'];
        $directions = ['top', 'bottom'];
        $prefixes = ['desktop' => $desktopPrefix, 'mobile' => $mobilePrefix];

        foreach ($prefixes as $device => $prefix) {
            foreach ($types as $type) {
                foreach ($directions as $direction) {
                    $value = $attributes['spacing'][$device][$type][$direction] ?? null;
                    if ($value !== null && $value !== -1) {
                        $classes[] = $prefix . $type[0] . $direction[0] . '-' . $value;
                    }
                }
            }
        }

        return implode(' ', $classes);
    }

    private function getColorClass(array $attributes, string $colorKey): string {
        return $attributes[$colorKey]['value'] ?? false
            ? 'bg-' . $attributes[$colorKey]['slug']
            : 'bg-white';
    }

    private function getFullViewportClass(array $attributes): string {
        return ($attributes['isFullViewportHeight'] ?? false) ? 'h-screen' : '';
    }

    private function getBackgroundMedia(array $attributes): null|array {
        if (!($attributes['isIncludeBackgroundMedia'] ?? false)) {
            return null;
        }

        $backgroundMedia = [];
        $backgroundMediaType = $this->getBackgroundMediaType($attributes);

        switch ($backgroundMediaType) {
            case self::MEDIA_TYPE_IMAGE:
                $backgroundMedia = $this->getBackgroundImage($attributes);
                break;

            case self::MEDIA_TYPE_VIDEO:
                $backgroundMedia = $this->getBackgroundVideo($attributes);
                break;

            case self::MEDIA_TYPE_ANIMATION:
                $backgroundMedia = $this->getBackgroundAnimation($attributes);
                break;
        }

        $backgroundMedia['type'] = $backgroundMediaType;

        return $backgroundMedia;
    }

    private function getBackgroundMediaType(array $attributes): ?string {
        $type = $attributes['backgroundMediaType'] ?? null;
        $validTypes = [
            self::MEDIA_TYPE_IMAGE,
            self::MEDIA_TYPE_VIDEO,
            self::MEDIA_TYPE_ANIMATION
        ];

        if ($type && !in_array($type, $validTypes, true)) {
            throw new InvalidArgumentException("Invalid media type: {$type}");
        }

        return $type;
    }

    private function getBackgroundImage(array $attributes): array {
        $media = $attributes['media'] ?? [];

        return [
            'url' => $media['url'] ?? null,
            'alt' => $media['alt'] ?? 'background image'
        ];
    }

    private function getBackgroundVideo(array $attributes): array {
        $media = $attributes['media'] ?? [];

        return [
            'url' => $media['url'] ?? null
        ];
    }

    private function getBackgroundAnimation(array $attributes): array {
        $media = $attributes['media'] ?? [];

        return [
            'url' => $media['url'] ?? null,
            'isLooped' => $attributes['isAnimationLooped'] ?? false
        ];
    }
}
