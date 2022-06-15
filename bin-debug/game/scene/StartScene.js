var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        return _super.call(this) || this;
    }
    StartScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    StartScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 播放背景音乐
        this.sound = RES.getRes('music_m4a');
        this.soundChannel = this.sound.play(0, -1);
        // GameData.musicSwitch = 1;
        this.musicImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.musicController, this);
        // this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        // 	this.popRuleGroup.visible = true;
        // }, this);
        this.btnGroup.touchEnabled = true;
        this.btnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.controllGroupBtns, this);
        // 监听弹窗关闭事件
        this.addEventListener('CLOSE_POP_REWARD_MY', this.closeRewardMy, this);
        this.addEventListener('CLOSE_POP_RULE', this.closeRule, this);
        this.startAnimation();
        this.createBoxs();
        this.setChildIndex(this.popRewardGroup, 99);
    };
    // 添加盲盒
    StartScene.prototype.createBoxs = function () {
    };
    // 控制音乐播放
    StartScene.prototype.musicController = function () {
        if (this.soundChannel) {
            this.soundChannel.stop();
            this.soundChannel = null;
            this.musicRotate(false);
            return;
        }
        this.soundChannel = this.sound.play(0, -1);
        this.musicRotate(true);
    };
    // 控制 musicImg 转动
    StartScene.prototype.musicRotate = function (isPlay) {
        var tw = egret.Tween;
        isPlay === true ? tw.resumeTweens(this.musicImg) : tw.pauseTweens(this.musicImg);
    };
    // 我的奖品
    StartScene.prototype.showMyReward = function () {
        // TODO: ajax 请求数据
        var data;
        this.popRewardGroup.visible = true;
        if (!data) {
            // this.popRewardMy.visible = true;
        }
    };
    // 按钮组事件委托
    StartScene.prototype.controllGroupBtns = function (evt) {
        switch (evt.target) {
            case this.bline_0:
                this.showMyReward();
                break;
            case this.bline_1:
                console.log('bline_1');
                break;
            case this.bline_2:
                console.log('bline_2');
                break;
        }
    };
    // 关闭我的奖品弹框
    StartScene.prototype.closeRewardMy = function () {
        this.popRewardGroup.visible = false;
    };
    // 关闭规则弹框
    StartScene.prototype.closeRule = function () {
        this.popRuleGroup.visible = false;
    };
    // 初始动画
    StartScene.prototype.startAnimation = function () {
        var tw = egret.Tween;
        // 音乐图片转动
        tw.get(this.musicImg, {
            loop: true
        }).to({
            rotation: 360
        }, 3000);
        // TODO: 扫帚与簸箕动画
        // this.cqmh.anchorOffsetX = -40;
        tw.get(this.cqmh, {
            loop: true
        }).to({ scaleX: 0.9, scaleY: 0.9 }, 800, egret.Ease.sineIn).
            to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut);
        for (var index = 0; index < 3; index++) {
            var eleName = "bline_" + index;
            var element = this[eleName];
            var num = 100;
            if (index == 1) {
                num = -50;
            }
            tw.get(element, {
                loop: true
            }).to({ y: num }, 1000, egret.Ease.backOut);
            // to({
            // 	rotation: 360
            // }, 500);
        }
        // tw.get(this.cqmh, {
        // 	loop: true
        // }).to({
        // 	rotation: 360
        // }, 500)
        // .to({
        // 	rotation: 1.69
        // }, 500);
    };
    return StartScene;
}(eui.Component));
__reflect(StartScene.prototype, "StartScene", ["eui.UIComponent", "egret.DisplayObject"]);
