package com.spring.shoppingmall.vo;

public class ProductInfoVO {
    private int prdIdx;
    private String prdBr;
    private String prdCtgr;
    private String prdName;
    private String prdPrc;
    private String prdView;
    private String prdImg;

    public int getPrdIdx() {
        return prdIdx;
    }

    public void setPrdIdx(int prdIdx) {
        this.prdIdx = prdIdx;
    }

    public String getPrdBr() {
        return prdBr;
    }

    public void setPrdBr(String prdBr) {
        this.prdBr = prdBr;
    }

    public String getPrdCtgr() {
        return prdCtgr;
    }

    public void setPrdCtgr(String prdCtgr) {
        this.prdCtgr = prdCtgr;
    }

    public String getPrdName() {
        return prdName;
    }

    public void setPrdName(String prdName) {
        this.prdName = prdName;
    }

    public String getPrdPrc() {
        return prdPrc;
    }

    public void setPrdPrc(String prdPrc) {
        this.prdPrc = prdPrc;
    }

    public String getPrdView() {
        return prdView;
    }

    public void setPrdView(String prdView) {
        this.prdView = prdView;
    }

    public String getPrdImg() {
        return prdImg;
    }

    public void setPrdImg(String prdImg) {
        this.prdImg = prdImg;
    }

    @Override
    public String toString() {
        return "ProductInfoVO{" +
                "prdIdx=" + prdIdx +
                ", prdBr='" + prdBr + '\'' +
                ", prdCtgr='" + prdCtgr + '\'' +
                ", prdName='" + prdName + '\'' +
                ", prdPrc='" + prdPrc + '\'' +
                ", prdView='" + prdView + '\'' +
                ", prdImg='" + prdImg + '\'' +
                '}';
    }
}
