
const utils = {
    calculateReach: function calculateReach (delayTime: number): number {
        delayTime -= 5;
        return (delayTime*100/2);
    }
    
}

export default utils;
