package com.spring.shoppingmall.vo;

import org.springframework.web.multipart.MultipartFile;

public class ExhibitionDTO {
    private String prdGrBr;
    private String prdGrTm;
    private String prdGrName;
    private MultipartFile prdGrImg;
    private String prdGrView;
    private String prdGrPrriod;
    private String prdGrSale;
    private String imgName;

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

    public MultipartFile getPrdGrImg() {
        return prdGrImg;
    }

    public void setPrdGrImg(MultipartFile prdGrImg) {
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

    public String getImgName() {
        return imgName;
    }

    public void setImgName(String imgName) {
        this.imgName = imgName;
    }

    @Override
    public String toString() {
        return "ExhibitionDTO{" +
                "prdGrBr='" + prdGrBr + '\'' +
                ", prdGrTm='" + prdGrTm + '\'' +
                ", prdGrName='" + prdGrName + '\'' +
                ", prdGrImg=" + prdGrImg +
                ", prdGrView='" + prdGrView + '\'' +
                ", prdGrPrriod='" + prdGrPrriod + '\'' +
                ", prdGrSale='" + prdGrSale + '\'' +
                ", imgName='" + imgName + '\'' +
                '}';
    }
}
