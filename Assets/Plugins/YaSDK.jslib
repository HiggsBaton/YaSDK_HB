mergeInto(LibraryManager.library, {

    BuyMoney: function ( count ) {
        let i = 0;
        while (i < count) {
            payments.purchase({ id: 'testPurchase' }).then(purchase => {
                addCount().then(() => payments.consumePurchase(purchase.purchaseToken));
                console.log("Покупка успешно совершена!");
            }).catch(err => {
                console.log(err);
            })
            i++;
        }

        function addCount() {
            myGameInstance.SendMessage("YaSDK", "AddMoney", 1);
        }
    },

    GetPurchases: function () {
        payments.getPurchases().then(purchases => {
            purchases.forEach(logPurchase);
        }).catch(err => {
            console.log(err);
        })

        function logPurchase(purchase) {
            console.log("purchase.productID " + purchase.productID);
            console.log("purchase.purchaseToken " + purchase.purchaseToken);
            console.log("purchase.developerPayload  " + purchase.developerPayload);
            console.log("purchase.signature  " + purchase.signature);

            if( purchase.productID == "testPurchase" )
            {
                addPurchaseCount();
            }
        }

        function addPurchaseCount() {
            myGameInstance.SendMessage("YaSDK", "ReceiveUserPurchases", 1);
        }
    },

    GetCatalog: function () {
        payments.getCatalog().then(products => {
                products.forEach(logProduct);
            });
        
        function logProduct(product) {
            console.log("product.id " + product.id);
            console.log("product.title " + product.title);
            console.log("product.description  " + product.description);
            console.log("product.imageURI  " + product.imageURI);
            console.log("product.price  " + product.price);
            console.log("product.priceValue  " + product.priceValue);
            console.log("product.priceCurrencyCode  " + product.priceCurrencyCode);
        }
    },

    IsAuthPlayer: function () {
        window.ysdk.getPlayer().then(_player => {
            if (_player.getMode() === 'lite') {
                window.ysdk.auth.openAuthDialog().then(() => {
                    window.ysdk.getPlayer().then(_player => {
                    if (_player.getMode() === 'lite') {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                    })
                }).catch(() => {
                    console.log("player not authorized");
                })
            }
            else {
                return true;
            }
        })
    },

    GetPlayerData: function () {
        var playerJson;
        window.ysdk.getPlayer().then(_player => {
            playerJson = {
                "uID": window.player.getUniqueID(),
                "name": window.player.getName(),
                "auth": true,
                "smallPhoto": window.player.getPhoto("small"),
                "mediumPhoto": window.player.getPhoto("medium"),
                "largePhoto": window.player.getPhoto("large")
            };
            console.log(JSON.stringify(playerJson));
            return window.player.getName();
        });
    },

    ShowFullscreen: function () {
        ysdk.adv.showFullscreenAdv({
        callbacks: {
            onOpen: function(wasShown) {
                console.log('Реклама Fullscreen открылась.');
            },
            onClose: function(wasShown) {
                console.log("Реклама Fullscreen закрылась.");
            },
            onError: function(error) {
                console.log("Ошибка по рекламе Fullscreen.");
            }
        }
        })
    },

    ShowRewarded: function () {
        ysdk.adv.showRewardedVideo({
        callbacks: {
            onOpen: () => {
                console.log('Реклама Rewarded открылась.');
            },
            onRewarded: () => {
                console.log('Реклама Rewarded просмотрена, и производим награду игроку за просмотр.');
                myGameInstance.SendMessage("YaSDK", "OnRewardedAdFinish");
            },
            onClose: () => {
                console.log('Реклама Rewarded закрылась.');
            }, 
            onError: (e) => {
                console.log('Ошибка по рекламе Rewarded:', e);
            }
        }
    })
    },

    ShowBanner: function () {
        try {
            window.ysdk.adv.showBannerAdv();
        }
        catch (e) {
            console.error(e);
        }
    },

    HideBanner: function () {
        try {
            window.ysdk.adv.hideBannerAdv();
        }
        catch(e) {
            console.error(e);
        }
    },

    AskReview: function () {
        ysdk.feedback.canReview().then(({ value, reason }) => {
            if (value) {
                ysdk.feedback.requestReview()
                    .then(({ feedbackSent }) => {
                        console.log(feedbackSent);
                    })
            } else {
                console.log(reason)
            }
        })
    },

    GetLBDescription: function () {
        var lb;

        ysdk.getLeaderboards().then(_lb => lb = _lb);

        ysdk.getLeaderboards().then(lb => 
            lb.getLeaderboardDescription('MainLeaderboard')
        ).then(res => 
            console.log(res)
        )
    },

    GetLBScores: function () {
        ysdk.getLeaderboards().then(_lb => 
            _lb.getLeaderboardEntries('MainLeaderboard', { quantityTop: 10 }).then(res => 
                console.log(res)
            )
        )
    },

    SetLBScores: function ( newScore, newMessage ) {
        ysdk.getLeaderboards().then(_lb => {
            _lb.setLeaderboardScore('MainLeaderboard', newScore);
        });
    },

    ToDesktop: function () {
        window.ysdk.shortcut.canShowPrompt().then(prompt => {
            console.log('Shortcut is allowed?:', prompt);
            if (prompt.canShow) {
                window.ysdk.shortcut.showPrompt().then(result => {
                    console.log('Shortcut created?:', result);
                })
            }
            else
            {
                console.log('cant show prompt to add to desktop')
            }
        })
    },
});