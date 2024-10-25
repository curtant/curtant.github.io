// animationManager.js

class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.isLottieAvailable = typeof lottie !== 'undefined';
        this.animationConfigs = [
            { containerId: 'lottie-juj', path: 'media/lottie/juj.json' },
            { containerId: 'lottie-tech', path: 'media/lottie/tech.json' },
            { containerId: 'lottie-dragon', path: 'media/lottie/dragon.json' },
            { containerId: 'lottie-nature', path: 'media/lottie/nature.json' }
        ];
        this.pendingAnimations = new Set(this.animationConfigs.map(config => config.containerId));
        this.observer = null;
    }

    init() {
        if (!this.isLottieAvailable) {
            console.warn('Lottie is not available. Animations will not be loaded.');
            return;
        }

        this.startObserving();
        this.loadAvailableAnimations();
    }

    startObserving() {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    this.loadAvailableAnimations();
                }
            });
        });

        this.observer.observe(document.body, { childList: true, subtree: true });
    }

    loadAvailableAnimations() {
        this.pendingAnimations.forEach(containerId => {
            if (document.getElementById(containerId)) {
                const config = this.animationConfigs.find(c => c.containerId === containerId);
                if (config) {
                    this.loadLottieAnimation(config.containerId, config.path);
                    this.pendingAnimations.delete(containerId);
                }
            }
        });

        if (this.pendingAnimations.size === 0) {
            this.observer.disconnect();
        }
    }

    loadLottieAnimation(containerId, animationPath, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container with id "${containerId}" not found. Will try again later.`);
            return null;
        }

        try {
            const animationInstance = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: options.loop !== undefined ? options.loop : true,
                autoplay: options.autoplay !== undefined ? options.autoplay : true,
                path: animationPath,
                ...options
            });

            this.animations.set(containerId, animationInstance);
            console.log(`Animation loaded for container: ${containerId}`);
            return animationInstance;
        } catch (error) {
            console.error(`Error loading Lottie animation for container ${containerId}:`, error);
            return null;
        }
    }

    playAnimation(containerId) {
        const animation = this.animations.get(containerId);
        if (animation) {
            animation.play();
            console.log(`Playing animation in container: ${containerId}`);
        } else {
            console.warn(`No animation found for container id "${containerId}"`);
        }
    }

    pauseAnimation(containerId) {
        const animation = this.animations.get(containerId);
        if (animation) {
            animation.pause();
            console.log(`Paused animation in container: ${containerId}`);
        } else {
            console.warn(`No animation found for container id "${containerId}"`);
        }
    }

    stopAnimation(containerId) {
        const animation = this.animations.get(containerId);
        if (animation) {
            animation.stop();
            console.log(`Stopped animation in container: ${containerId}`);
        } else {
            console.warn(`No animation found for container id "${containerId}"`);
        }
    }

    getAllAnimationIds() {
        return Array.from(this.animations.keys());
    }

    removeAnimation(containerId) {
        const animation = this.animations.get(containerId);
        if (animation) {
            animation.destroy();
            this.animations.delete(containerId);
            console.log(`Removed animation from container: ${containerId}`);
        }
    }
}

export const animationManager = new AnimationManager();
