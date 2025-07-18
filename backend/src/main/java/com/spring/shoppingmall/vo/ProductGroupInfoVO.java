package com.spring.shoppingmall.vo;

import java.util.List;

public class ProductGroupInfoVO {

    private int prdGrIdx;
    private String prdGrBr;
    private String prdGrTm;
    private String prdGrName;
    private String prdGrImg;
    private String prdGrView;
    private String prdGrPrriod;
    private String prdGrSale;
    private List<ProductPatternInfoVO> productPatternInfoVOList;

    public int getPrdGrIdx() {
        return prdGrIdx;
    }

    public void setPrdGrIdx(int prdGrIdx) {
        this.prdGrIdx = prdGrIdx;
    }

    public String getPrdGrBr() {
        return prdGrBr;
    }

    public void setPrdGrBr(String prdGrBr) {
        this.prdGrBr = prdGrBr;
    }

    public String getPrdGrTm() {
        return prdGrTm;
    }

    public void setPrdGrTm(String prdGrTm) {
        this.prdGrTm = prdGrTm;
    }

    public String getPrdGrName() {
        return prdGrName;
    }

    public void setPrdGrName(String prdGrName) {
        this.prdGrName = prdGrName;
    }

    public String getPrdGrImg() {
        return prdGrImg;
    }

    public void setPrdGrImg(String prdGrImg) {
        this.prdGrImg = prdGrImg;
    }

    public String getPrdGrView() {
        return prdGrView;
    }

    public void setPrdGrView(String prdGrView) {
        this.prdGrView = prdGrView;
    }

    public String getPrdGrPrriod() {
        return prdGrPrriod;
    }

    public void setPrdGrPrriod(String prdGrPrriod) {
        this.prdGrPrriod = prdGrPrriod;
    }

    public String getPrdGrSale() {
        return prdGrSale;
    }

    public void setPrdGrSale(String prdGrSale) {
        this.prdGrSale = prdGrSale;
    }

    public List<ProductPatternInfoVO> getProductPatternInfoVOList() {
        return productPatternInfoVOList;
    }

    public void setProductPatternInfoVOList(List<ProductPatternInfoVO> productPatternInfoVOList) {
        this.productPatternInfoVOList = productPatternInfoVOList;
    }

    @Override
    public String toString() {
        return "ProductGroupInfoVO{" +
                "prdGrIdx=" + prdGrIdx +
                ", prdGrBr='" + prdGrBr + '\'' +
                ", prdGrTm='" + prdGrTm + '\'' +
                ", prdGrName='" + prdGrName + '\'' +
                ", prdGrImg='" + prdGrImg + '\'' +
                ", prdGrView='" + prdGrView + '\'' +
                ", prdGrPrriod='" + prdGrPrriod + '\'' +
                ", prdGrSale='" + prdGrSale + '\'' +
                ", productPatternInfoVOList=" + productPatternInfoVOList +
                '}';
    }
}
