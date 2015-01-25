(function () {
	if (window.LW === undefined) {
		window.LW = {};	
	}

	var MainMenu = LW.MainMenu = function (options) {
		for (var attr in options) {
			this[attr] = options[attr];
		}
		this.initializeEvent && this.initializeEvent();
	};

	MainMenu.prototype.swapTo = function (options) {
		LW.CurrentMenu && LW.CurrentMenu.remove();
		LW.CurrentMenu = this;

		this.checkingInputs = setInterval(this.checkInput.bind(this), 1000/60);

		$(options.selector).empty();
		this.swapToEvent && this.swapToEvent();
		this.addItems(options.selector);
	};

	MainMenu.prototype.addItems = function (selector) {
		$('.menu-title').html(this.title);
		for (var i = 0; this.commands.length > i; i++) {
			command = this.commands[i];
			var $li = $('<li>');
			$li.addClass('menu-item')
			$li.addClass(command);
			if (i === 0) {
				$li.addClass('selected');
			}
			$li.html(command);
			$li.data('command', command);
			$(selector).append($li);
			$li.on("click", this.events[command].bind(this));
		};
	};

	MainMenu.prototype.executeCommand = function () {
		var $selected = $('.selected');
		this.events[$selected.data('command')].bind(this)();
	};

	MainMenu.prototype.selectCommand = function (num) {
		LW.GlobalSL.playSE('menu-move.ogg', 100);
		var $currentItem = $(".selected");
		var $menuItems = $(".menu-item")
		var currentIndex = $menuItems.index($currentItem);
		$currentItem.removeClass("selected");
		var newIndex = (currentIndex + num + $menuItems.length) % $menuItems.length;
		$($menuItems[newIndex]).addClass("selected");
	};

	MainMenu.prototype.backCommand = function () {
		LW.GlobalSL.playSE('menu-cancel.ogg', 100);
		if (this.parentMenu) {
			this.parentMenu.swapTo({selector: '.main-menu-items'});	
		}
	};

	MainMenu.prototype.remove = function () {
		this.removeEvent && this.removeEvent();
		clearInterval(this.checkingInputs);
		if (this.quadViews) {
			$('.main-menu-quads').empty();
			this.quadViews.forEach(function (quad) {
				quad.remove();
			})
			this.quadViews = [];
		}
	};

	MainMenu.prototype.checkInput = function () {
		for (var i = 0; i < LW.AllPlayers.length; i++) {
			var player = LW.AllPlayers[i];
			if (this.quadViews) {
				var skip = false;
				for (var j = this.quadViews.length - 1; j >= 0; j--) {
					var quad = this.quadViews[j]
					if (player === quad.player) {
						skip = true;
					}
				};
				if (skip) {continue;}
			}
			player.checkControllerActions();
			var wizard = player.wizard;
			if (wizard.actions["jump"] === "tap") {
				this.executeCommand(player);
			}
			if (wizard.actions["up"] === "tap") {
				this.selectCommand(-1);
			}
			if (wizard.actions["down"] === "tap") {
				this.selectCommand(1);
			}
			if (wizard.actions["spells"][2] === "tap") {
				this.backCommand();
			}
		}
	}

})();