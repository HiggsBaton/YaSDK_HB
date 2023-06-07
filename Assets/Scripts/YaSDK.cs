using UnityEngine;
using UnityEngine.UI;
using System.Runtime.InteropServices;

public class YaSDK : MonoBehaviour
{
    // Local variables
    int PointsCount = 0;
    int PurchaseCount = 0;

    // UI elements
    Text PointsPurchased;
    Text PurchasesMade;
    InputField ScoreInput;

    // YaSDK

    // магазин
    [DllImport("__Internal")]
    private static extern void BuyMoney( int value );
    [DllImport("__Internal")]
    private static extern void GetPurchases();
    [DllImport("__Internal")]
    private static extern void GetCatalog();

    // данные игрока
    [DllImport("__Internal")]
    private static extern bool IsAuthPlayer();
    [DllImport("__Internal")]
    private static extern string GetPlayerData();

    // реклама
    [DllImport("__Internal")]
    private static extern void ShowFullscreen();
    [DllImport("__Internal")]
    private static extern void ShowRewarded();
    [DllImport("__Internal")]
    private static extern void ShowBanner();
    [DllImport("__Internal")]
    private static extern void HideBanner();

    // запрос оценки
    [DllImport("__Internal")]
    private static extern void AskReview();

    // лидерборды
    [DllImport("__Internal")]
    private static extern void GetLBDescription();
    [DllImport("__Internal")]
    private static extern void GetLBScores();
    [DllImport("__Internal")]
    private static extern void SetLBScores( int newScore, string newMessage );

    // ярлык на рабочий стол
    [DllImport("__Internal")]
    private static extern void ToDesktop();

    // Begin
    private void Start() {
        PointsPurchased = GameObject.FindGameObjectWithTag("PointsText").GetComponent<Text>();
        PurchasesMade = GameObject.FindGameObjectWithTag("PurchasesText").GetComponent<Text>();
        ScoreInput = GameObject.FindGameObjectWithTag("ScoreInput").GetComponent<InputField>();
        
        GetUserPurchases();
    }

    public void BuyMoneyButton( int value )
    {
        BuyMoney( value );
    }

    public void AddMoney( int value )
    {
        PointsCount += value;
        PointsPurchased.text = "Points Purchased: " + PointsCount;
    }
    public void GetUserPurchases()
    {
        PurchaseCount = 0;
        GetPurchases();
    }

    public void ReceiveUserPurchases( int value )
    {
        PurchaseCount += value;
        PurchasesMade.text = "Purchases Made: " + PurchaseCount;
    }

    public void ShopCatalogToConsole()
    {
        GetCatalog();
    }

    public void AskAuthorize()
    {
        IsAuthPlayer();
    }

    public void GetPlayerDataString()
    {
        GetPlayerData();
    }

    public void TriggerFullscreenAd()
    {
        ShowFullscreen();
    }

    public void TriggerRewardedAd()
    {
        ShowRewarded();
    }

    public void OnRewardedAdFinish()
    {
        AddMoney( 1 );
    }

    public void TriggerBannerOn()
    {
        ShowBanner();
    }

    public void TriggerBannerOff()
    {
        HideBanner();
    }

    public void TryAskReview()
    {
        AskReview();
    }

    public void TryGetDescription()
    {
        GetLBDescription();
    }

    
    public void TryGetLeaderboard()
    {
        GetLBScores();
    }

    public void TrySetLeaderboard()
    {
        int score = int.Parse(ScoreInput.text);
        string msg = ScoreInput.text;
        SetLBScores( score, msg );
    }

    public void TryPutToDesktop()
    {
        ToDesktop();
    }
}
