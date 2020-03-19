const LAPTOP = 1599;
const TABLET = 1199;
const VERTICAL_TABLET = 990;
const MOBILE = 767;
const VERTICAL_MOBILE = 479;
const MINIMUM_RESOLUTION = 320;

class ResolutionDevice {
  private readonly heightResolution: number;
  private readonly lowResolution: number;

  constructor(heightResolution: number, lowResolution: number) {
    this.heightResolution = heightResolution;
    this.lowResolution = lowResolution;
  }

  /**
   * Возврашает true если переданная ширина больше текущего разрешения
   * @param {number} width Any width. User device width by default
   * @returns {boolean}
   */
  isMore(width = window.innerWidth) {
    return width > this.heightResolution;
  }

  /**
   * Возврашает true если переданная ширина меньше\равно текущего разрешения
   * @param {number} width Any width. User device width by default
   * @returns {boolean}
   */
  isLess(width = window.innerWidth) {
    return width <= this.lowResolution;
  }

  /**
   * Возврашает true если переданная ширина вписывается в рамки текущего разрешения
   * @param {number} width Any width. User device width by default
   * @returns {boolean}
   */
  isCurrent(width = window.innerWidth) {
    return width <= this.heightResolution && width > this.lowResolution;
  }
}

class ResolutionHelper {
  public readonly laptop: ResolutionDevice;
  public readonly tablet: ResolutionDevice;
  public readonly verticalTablet: ResolutionDevice;
  public readonly mobile: ResolutionDevice;
  public readonly verticalMobile: ResolutionDevice;

  constructor() {
    this.laptop = new ResolutionDevice(LAPTOP, TABLET);
    this.tablet = new ResolutionDevice(TABLET, VERTICAL_TABLET);
    this.verticalTablet = new ResolutionDevice(VERTICAL_TABLET, MOBILE);
    this.mobile = new ResolutionDevice(MOBILE, VERTICAL_MOBILE);
    this.verticalMobile = new ResolutionDevice(
      VERTICAL_MOBILE,
      MINIMUM_RESOLUTION
    );
  }
}

export default new ResolutionHelper();
