class StartScene extends eui.Component implements eui.UIComponent {
	public musicImg: eui.Image;
	public pjImg: eui.Image;
	public sbImg: eui.Image;
	public cqmh: eui.Label
	public rewardBtn: eui.Button;
	public btnGroup: eui.Group;
	public rewardMyBtn: eui.Button;
	public shareBtn: eui.Button;
	public toMainBtn: eui.Button;

	public popRewardGroup: eui.Group;
	public popRuleGroup: eui.Group;

	private sound: egret.Sound;
	private soundChannel: egret.SoundChannel;
	public boxGroup: eui.Group;
	public bline_0: eui.Group;
	public bline_1: eui.Group;
	public bline_2: eui.Group;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		// 播放背景音乐
		this.sound = RES.getRes('music_m4a');
		this.soundChannel = this.sound.play(0, -1);
		// GameData.musicSwitch = 1;
		this.musicImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.musicController, this);
		// this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
		// 	this.popRuleGroup.visible = true;
		// }, this);

		this.btnGroup.touchEnabled = true
		this.btnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.controllGroupBtns, this);

		// 监听弹窗关闭事件
		this.addEventListener('CLOSE_POP_REWARD_MY', this.closeRewardMy, this);
		this.addEventListener('CLOSE_POP_RULE', this.closeRule, this);
		this.startAnimation();
		this.createBoxs()
		this.setChildIndex(this.popRewardGroup,99)
	}
	// 添加盲盒
	private createBoxs(): void {

	}
	// 控制音乐播放
	private musicController(): void {
		if (this.soundChannel) {
			this.soundChannel.stop();
			this.soundChannel = null;
			this.musicRotate(false)
			return;
		}
		this.soundChannel = this.sound.play(0, -1);
		this.musicRotate(true);
	}

	// 控制 musicImg 转动
	private musicRotate(isPlay: boolean): void {
		let tw = egret.Tween;
		isPlay === true ? tw.resumeTweens(this.musicImg) : tw.pauseTweens(this.musicImg);
	}

	// 我的奖品
	private showMyReward(): void {
		// TODO: ajax 请求数据
		let data: Array<Object>;

		this.popRewardGroup.visible = true;

		if (!data) {
			// this.popRewardMy.visible = true;
		}

	}

	// 按钮组事件委托
	private controllGroupBtns(evt: egret.TouchEvent): void {
		switch (evt.target) {
			case this.bline_0:
				this.showMyReward()
				break;
			case this.bline_1:
				console.log('bline_1')
				break;
			case this.bline_2:
				console.log('bline_2')
				break;
		}
	}

	// 关闭我的奖品弹框
	public closeRewardMy() {
		this.popRewardGroup.visible = false
	}

	// 关闭规则弹框
	public closeRule() {
		this.popRuleGroup.visible = false
	}


	// 初始动画
	private startAnimation(): void {
		let tw = egret.Tween;

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
		for (let index = 0; index < 3; index++) {
			const eleName = `bline_${index}`
			const element = this[eleName];
			let num = 100
			if (index == 1) {
				num = -50
			}
			tw.get(element, {
				loop: true
			}).to({ y: num }, 1000, egret.Ease.backOut)

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
	}
}