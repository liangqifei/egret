var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    // public mainScene: MainScene;
    function SceneManager() {
        this.startScene = new StartScene();
        // this.mainScene = new MainScene();
    }
    Object.defineProperty(SceneManager, "instance", {
        get: function () {
            if (!this.sceneManager) {
                this.sceneManager = new SceneManager();
            }
            return this.sceneManager;
        },
        enumerable: true,
        configurable: true
    });
    // 删除其他场景
    SceneManager.prototype.removeOtherScene = function (scene) {
        var _this = this;
        // , this.mainScene
        var arr = [this.startScene];
        arr.forEach(function (item) {
            if (scene === item) {
                return;
            }
            if (item.parent) {
                _this._stage.removeChild(item);
            }
        });
    };
    // 设置根场景
    SceneManager.prototype.setScene = function (s) {
        this._stage = s;
    };
    // 开始场景
    SceneManager.toStartScene = function () {
        this.instance.removeOtherScene(this.instance.startScene);
        this.instance._stage.addChild(this.instance.startScene);
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
