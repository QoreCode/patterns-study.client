import {ResolutionDevice} from '@/buisness/tools/resolution/resolution';

const LAPTOP = 1599;
const TABLET = 1199;
const VERTICAL_TABLET = 990;
const MOBILE = 767;
const VERTICAL_MOBILE = 479;
const MINIMUM_RESOLUTION = 320;

export class ResolutionHelper {

    public static getInstance() {
        if (ResolutionHelper.instance === null) {
            ResolutionHelper.instance = new ResolutionHelper();
        }

        return ResolutionHelper.instance;
    }

    private static instance: ResolutionHelper;
    public readonly laptop: ResolutionDevice;
    public readonly tablet: ResolutionDevice;
    public readonly verticalTablet: ResolutionDevice;
    public readonly mobile: ResolutionDevice;
    public readonly verticalMobile: ResolutionDevice;

    private constructor() {
        this.laptop = new ResolutionDevice(LAPTOP, TABLET);
        this.tablet = new ResolutionDevice(TABLET, VERTICAL_TABLET);
        this.verticalTablet = new ResolutionDevice(VERTICAL_TABLET, MOBILE);
        this.mobile = new ResolutionDevice(MOBILE, VERTICAL_MOBILE);
        this.verticalMobile = new ResolutionDevice(VERTICAL_MOBILE, MINIMUM_RESOLUTION);
    }
}
