class MainScene extends eui.Component implements eui.UIComponent {
	public scroller: eui.Scroller;
	public viewportGroup: eui.Group;

	public mThigh: eui.Image;
	public mCalf: eui.Image;
	public mHand: eui.Image;
	public smokeGroup: eui.Group;

	public gHand: eui.Image;
	public gLeg: eui.Image;

	public tip: eui.Image;

	public directionGroup: eui.Group;
	public lr: eui.Image;
	public rr: eui.Image;

	// public prizeComponent: eui.Component;
	public popPrizeGroup: eui.Group;
	public msg: eui.Label;
	public icon: eui.Image;
	public img: eui.Image;
	public closeBtn: eui.Button;
	public appName: eui.Label;
	public downloadGroup: eui.Group;


	public total: eui.Label;
	public restRect: eui.Rect;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		// 网络图片跨域
		egret.ImageLoader.crossOrigin = 'anonymous';

		this.scroller.viewport = this.viewportGroup;
		this.scroller.bounces = false;
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.viewport.scrollH = 740;

		// 触摸穿透
		this.directionGroup.touchThrough = true;
		this.directionGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.arrowEvent, this);

		setTimeout(() => {
			this.viewportGroup.removeChild(this.tip);
		}, 3000);

		this.startAnimation();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.controlSceneEvent, this);
		// this.addEventListener('CLOSE_POP_PRIZE', this.closePrize, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePrize, this);
	}

	// 对整个页面进行事件委托
	private controlSceneEvent(evt: egret.TouchEvent) {

		// 根据资源名做判断
		console.log(evt.target.source)

		if (!evt.target.source) return;
		let firstLetter: string = evt.target.source[0]
		switch (firstLetter) {
			case 'c':
				this.cAnimation(evt.target);
				break;
			case 'a':
				this.requestApp();
				this.aAnimation(evt.target, this.popPrize.bind(this));

		}
	}

	// c 动画
	private cAnimation(target) {
		let tw = egret.Tween;
		tw.get(target, {
			loop: false
		}).to({
			y: target.y - 50
		}, 500, egret.Ease.backInOut)
			.to({
				y: target.y
			}, 250, egret.Ease.backInOut);
	}

	// a 动画
	private aAnimation(target, cb: Function) {
		if (!target.isClick) {
			GameData.prizeTotal -= 1
			this.total.text = String(GameData.prizeTotal);
			this.restRect.width = GameData.prizeTotal / 14 * 120;
			target.isClick = true;
		}
		let tw = egret.Tween;
		tw.get(target, {
			loop: false
		}).to({
			y: target.y - 50
		}, 1000, egret.Ease.backInOut)
			.to({
				y: target.y
			}, 500, egret.Ease.backInOut)
			.wait(800)
			.call(cb);
	}

	// app 数据请求
	private requestApp() {
		let request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open('https://easy-mock.com/mock/5c10be4a9b6eaa4cae0edb97/app', egret.HttpMethod.GET);
		request.setRequestHeader('Content-Type', 'application/json');
		request.send();
		// 监听，填充数据
		request.addEventListener(egret.Event.COMPLETE, this.inputData, this);
	}

	// 填充数据
	private inputData(event: egret.Event) {
		let request = <egret.HttpRequest>event.currentTarget;
		let res = JSON.parse(request.response);

		GameData.prizeObj = res.data;

		[this.appName.text, this.msg.text, this.icon.source, this.img.source] =
			[
				GameData.prizeObj.appName,
				`恭喜你。。。${GameData.prizeObj.appName}`,
				GameData.prizeObj.icon,
				GameData.prizeObj.img
			];
		this.downloadGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			window.location.href = GameData.prizeObj.url;
		}, this);
	}

	// 打开弹窗
	private popPrize() {
		this.popPrizeGroup.visible = true;
	}

	// 关闭app弹框
	public closePrize() {
		this.popPrizeGroup.visible = false;
	}


	// 方向箭头事件
	private arrowEvent(evt: egret.TouchEvent) {
		let distance: number = 100;
		let name = evt.target.source;
		let currDistance = this.scroller.viewport.scrollH

		if (name === 'rr') {
			console.log(currDistance + distance)
			if (currDistance + distance >= 1460) {
				this.scroller.viewport.scrollH = 1460;
				return;
			}
			this.scroller.viewport.scrollH += distance;
		} else if (name === 'lr') {
			if (currDistance - distance <= 0) {
				this.scroller.viewport.scrollH = 0;
				return;
			}
			this.scroller.viewport.scrollH -= distance;
		}
	}

	// 初始动画
	private startAnimation() {
		let tw = egret.Tween;
		// man 手臂动画
		tw.get(this.mHand, {
			loop: true
		}).to({
			rotation: 16
		}, 800)
			.to({
				rotation: 15
			}, 200)
			.wait(1000)
			.to({
				rotation: 0
			}, 1000)
			.wait(500);

		// man 大腿动画
		tw.get(this.mThigh, {
			loop: true
		}).to({
			rotation: 8.16
		}, 800)
			.to({
				rotation: 7.16
			}, 200)
			.wait(1000)
			.to({
				rotation: 2.81
			}, 1000)
			.wait(500);

		// man 小腿动画
		tw.get(this.mCalf, {
			loop: true
		}).to({
			x: 60.31,
			y: 170.16,
			rotation: 18
		}, 800)
			.to({
				rotation: 16
			}, 200)
			.wait(1000)
			.to({
				x: 56.83,
				y: 180.73,
				rotation: 2
			}, 1000)
			.wait(500);

		// man 烟雾 动画
		tw.get(this.smokeGroup, {
			loop: true
		}).to({
			x: 56,
			y: 0,
			alpha: 1
		}, 1000)
			.wait(300)
			.to({
				alpha: 0
			}, 1000)
			.to({
				x: 54.33,
				y: 8.98
			})

		// girl 手臂动画
		tw.get(this.gHand, {
			loop: true
		}).to({
			rotation: -3
		}, 800)
			.to({
				rotation: 5.21
			}, 800)

		// girl 腿部动画
		tw.get(this.gLeg, {
			loop: true
		}).to({
			rotation: -10
		}, 800)
			.to({
				rotation: 0
			}, 800)

		// 方向箭头动画
		tw.get(this.lr, {
			loop: true
		}).to({
			x: 10
		}, 800)
			.to({
				x: 0
			}, 800);

		tw.get(this.rr, {
			loop: true
		}).to({
			x: 586
		}, 800)
			.to({
				x: 596
			}, 800)
	}
}