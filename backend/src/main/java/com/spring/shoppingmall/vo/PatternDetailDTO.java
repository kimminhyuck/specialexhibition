package com.spring.shoppingmall.vo;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class PatternDetailDTO {
    private int ptDetailIdx;
    private int prdGrIdx;
    private int prdPtIdx;
    private String ptDetailType;
    private String ptDetailImg;
    private String ptDetailDesc;
    private String ptDetailMv;
    private String prdIdx;
    private String ptDetailView;
    private String crudType;
    private List<MultipartFile> patternImages;

    public int getPtDetailIdx() {
        return ptDetailIdx;
    }

    public void setPtDetailIdx(int ptDetailIdx) {
        this.ptDetailIdx = ptDetailIdx;
    }

    public int getPrdGrIdx() {
        return prdGrIdx;
    }

    public void setPrdGrIdx(int prdGrIdx) {
        this.prdGrIdx = prdGrIdx;
    }

    public int getPrdPtIdx() {
        return prdPtIdx;
    }

    public void setPrdPtIdx(int prdPtIdx) {
        this.prdPtIdx = prdPtIdx;
    }

    public String getPtDetailType() {
        return ptDetailType;
    }

    public void setPtDetailType(String ptDetailType) {
        this.ptDetailType = ptDetailType;
    }

    public String getPtDetailImg() {
        return ptDetailImg;
    }

    public void setPtDetailImg(String ptDetailImg) {
        this.ptDetailImg = ptDetailImg;
    }

    public String getPtDetailDesc() {
        return ptDetailDesc;
    }

    public void setPtDetailDesc(String ptDetailDesc) {
        this.ptDetailDesc = ptDetailDesc;
    }

    public String getPtDetailMv() {
        return ptDetailMv;
    }

    public void setPtDetailMv(String ptDetailMv) {
        this.ptDetailMv = ptDetailMv;
    }

    public String getPrdIdx() {
        return prdIdx;
    }

    public void setPrdIdx(String prdIdx) {
        this.prdIdx = prdIdx;
    }

    public String getPtDetailView() {
        return ptDetailView;
    }

    public void setPtDetailView(String ptDetailView) {
        this.ptDetailView = ptDetailView;
    }

    public String getCrudType() {
        return crudType;
    }

    public void setCrudType(String crudType) {
        this.crudType = crudType;
    }

    public List<MultipartFile> getPatternImages() {
        return patternImages;
    }

    public void setPatternImages(List<MultipartFile> patternImages) {
        this.patternImages = patternImages;
    }

    @Override
    public String toString() {
        return "PatternDetailDTO{" +
                "ptDetailIdx=" + ptDetailIdx +
                ", prdGrIdx=" + prdGrIdx +
                ", prdPtIdx=" + prdPtIdx +
                ", ptDetailType='" + ptDetailType + '\'' +
                ", ptDetailImg='" + ptDetailImg + '\'' +
                ", ptDetailDesc='" + ptDetailDesc + '\'' +
                ", ptDetailMv='" + ptDetailMv + '\'' +
                ", prdIdx='" + prdIdx + '\'' +
                ", ptDetailView='" + ptDetailView + '\'' +
                ", crudType='" + crudType + '\'' +
                ", patternImages=" + patternImages +
                '}';
    }
}
